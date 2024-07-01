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
router.get('/all-product', getAllProductController)
router.post('/update-product',authToken,updateProductController)

// getProducts
router.get('/get-productsCategory', getCategoryProductController)
router.post('/get-categorywiseProducts' , getCategoryWiseProductController)
router.post('/product-details', getProductDetails)


export default router;



