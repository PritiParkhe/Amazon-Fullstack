import express from "express";
import { userSignupController } from "../controllers/userSignup.js";
import { userSigninController } from "../controllers/userSignin.js";
import { userInfoController } from "../controllers/userInfo.js";
import { authToken } from "../middleware/auth.js";
import { userLogoutController } from "../controllers/userLogout.js";


export const router = express.Router();

// Define routes
router.post('/signup', userSignupController);
router.post('/signin', userSigninController);
router.get('/user', authToken, userInfoController)
router.get('/logout',userLogoutController)


export default router;



