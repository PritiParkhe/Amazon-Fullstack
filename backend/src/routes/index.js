import express from "express";
import { userSignupController } from "../controllers/userSignup.js";

export const router = express.Router();

// Define routes
router.post('/signup', userSignupController);

// You can add more routes here

export default router;



