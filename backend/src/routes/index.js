import express from "express";
import { userSignupController } from "../controllers/userSignup.js";
import { userSigninController } from "../controllers/userSignin.js";
import { userInfoController } from "../controllers/userInfo.js";
import { authToken } from "../middleware/auth.js";
import { userLogoutController } from "../controllers/userLogout.js";
import { allUsers } from "../controllers/allUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { UploadProductController } from "../controllers/uploadProduct.js";


export const router = express.Router();

// Define routes
router.post('/signup', userSignupController);
router.post('/signin', userSigninController);
router.get('/user', authToken, userInfoController)
router.get('/logout',userLogoutController)
// admin panel
router.get('/all-users', authToken ,allUsers)
router.post('/update-user', authToken, updateUser)
//upload product
router.post('/upload-product', authToken, UploadProductController)


export default router;



