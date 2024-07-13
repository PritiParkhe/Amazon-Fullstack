import { stripe } from "../../config/stripe.js";
import orderModel from "../../models/orderProductModel.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRETE_KEY;

async function getLineItem(lineItems) {
  let ProductItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.image,
      };

      ProductItems.push(productData);
    }
  }
  return ProductItems;
}

const webHooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const payloadString = JSON.stringify(request.body);
  // console.log(payloadString, "payload string");
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    console.log("event", event);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("session", session);

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItem(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
          shipping_options: session.shipping_options,
          totalAmount: session.amount_total / 100,
        },
      };

      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};

export { webHooks };
