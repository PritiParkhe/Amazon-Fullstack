import userModel from "../../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
dotenv.config({ path: './env' });
const secretKey = process.env.JWT_SECRET;

async function userSigninController(req, res) {
  try {
    const {email, password } = req.body;
    // console.log(req.body);
    if (!email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Required email not provided',
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Required password not provided',
        success: false,
      });
    }

    const user = await userModel.findOne({email})
    if (!user) {
      throw new Error("User not found")
    }

    const checkPassword =  await bcrypt.compare(password, user.password)
    console.log("checkPassword",checkPassword);
    
    if (checkPassword) {
      const tokenData = {
        _id : user._id,
        email: user.email,
      }
      const token = await jwt.sign(tokenData, secretKey, {expiresIn: 60 * 60 * 10});
      const tokenOption = {
        httpOnly : true,
        secure: true,

      }
      res.cookie("token",token, tokenOption).json({
        message: "Login Successfully",
        data : token,
        success: true,
        error: false,
      })
    } else {
      throw new Error("Please check password again")
      
    }

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


export { userSigninController };