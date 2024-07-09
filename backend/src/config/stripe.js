import Stripe from 'stripe'
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


const  stripe = Stripe(process.env.STRIPE_SECRETE_KEY)
export{stripe}