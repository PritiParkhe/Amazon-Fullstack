import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
const saltRounds = 10;

async function userSignupController(req, res) {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    const user = await userModel.findOne({email})
    if (user) {
      throw new Error("Already User Exist")
    }
    
    if (!name) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Required name not provided'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Required email not provided'
      });
    }

    if (!password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Required password not provided'
      });
    }

    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      
      if (!hash) {
        throw new Error('Something went wrong');
      }

      const payload = new userModel({
        ...req.body,
        role: "GENERAL",
        password: hash // hashed password as a string in database
      });

      const userData = new userModel(payload);
      const saveUser = await userData.save();

      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User created successfully!"
      });

    } catch (error) {
      res.json({
        message: error,
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


export { userSignupController };