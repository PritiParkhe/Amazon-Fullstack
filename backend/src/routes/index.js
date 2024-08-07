import express from "express";
import { userSignupController } from "../controllers/user/userSignup.js";
import { userSigninController } from "../controllers/user/userSignin.js";
import { userInfoController } from "../controllers/user/userInfo.js";
import { authToken } from "../middleware/auth.js";
import { userLogoutController } from "../controllers/user/userLogout.js";
import { allUsers } from "../controllers/user/allUsers.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { UploadProductController } from "../controllers/product/uploadProduct.js";
import { getAllProductController } from "../controllers/product/getProduct.js";
import { updateProductController } from "../controllers/product/updateProduct.js";
import { getCategoryProductController } from "../controllers/product/getCategoryProduct.js";
import { getCategoryWiseProductController } from "../controllers/product/getCategoryWiseProducts.js";
import { getProductDetails } from "../controllers/product/getProductDetails.js";
import { addToCartProductController } from "../controllers/product/addToCartProduct.js";
import { countAddToProductController } from "../controllers/user/countAddToCartProduct.js";
import { viewCartProductsController } from "../controllers/user/viewCartProducts.js";
import { deleteCartProduct } from "../controllers/user/deleteCartProduct.js";
import { searchProductController } from "../controllers/product/searchProduct.js";
import { filterProductController } from "../controllers/product/filterProduct.js";
import { paymentController } from "../controllers/payment/paymentController.js";
import { webHooks } from "../controllers/payment/webHook.js";
import { orderController } from "../controllers/payment/orderController.js";
import { updateAddToCartProduct } from "../controllers/user/updateCartProduct.js";

export const router = express.Router();

// Define routes
router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user", authToken, userInfoController);
router.get("/logout", userLogoutController);
// admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
//upload product
router.post("/upload-product", authToken, UploadProductController);
router.get("/all-product", getAllProductController);
router.post("/update-product", authToken, updateProductController);

// getProducts
router.get("/get-productsCategory", getCategoryProductController);
router.post("/get-categorywiseProducts", getCategoryWiseProductController);
router.post("/product-details", getProductDetails);
router.get("/search", searchProductController);
router.post("/filter-product", filterProductController);

// add to card
router.post("/addtocart", authToken, addToCartProductController);
router.get("/countCartProduct", authToken, countAddToProductController);
router.get("/view-cart-product", authToken, viewCartProductsController);
router.post("/update-cart-product",authToken,updateAddToCartProduct);
router.delete("/delete-cart-product", authToken, deleteCartProduct);

//payment
router.post("/payment", authToken, paymentController);
router.post("/webhook", webHooks); // /api/webhook
router.get("/order-list",authToken, orderController)
export default router;
