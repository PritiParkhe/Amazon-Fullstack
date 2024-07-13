import userModel from "../../models/userModel.js";
async function allUsers(req,res){
  try {
    // console.log("user id", req.userId );
    const allUsers = await  userModel.find()
    res.json({
      message : "All-Users",
      data : allUsers,
      success : true,
      error : false
    })
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export {allUsers};