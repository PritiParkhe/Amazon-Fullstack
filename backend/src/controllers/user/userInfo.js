import userModel from "../models/userModel.js"; // Ensure this matches the export in userModel.js

export async function userInfoController(req, res) {
  try {
    console.log("user id ", req.userId);
    const user = await userModel.findById(req.userId);
    res.status(200).json({
      message: "User found",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
