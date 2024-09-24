import userModel from "../../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./env" });
const secretKey = process.env.JWT_SECRET;

async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Email is required",
        success: false,
      });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Password is required",
        success: false,
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: "User not found",
        success: false,
      });
    }

    // Check if the provided password matches the stored hashed password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      // Sign JWT token with user data and secret key
      const token = jwt.sign(tokenData, secretKey, {
        expiresIn: "10h", // 10 hours
      });

      // Set token options
      const tokenOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      };

      // Send token in cookie and respond with success
      res.cookie("token", token, tokenOptions).status(200).json({
        message: "Login Successfull",
        data: token,
        success: true,
        error: false,
      });
    } else {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export { userSigninController };
