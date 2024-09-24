import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export async function authToken(req, res, next) {
  try {
    // Check if token exists in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required, please log in.",
        error: true,
        success: false,
      });
    }

    // Verify token
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error("Token Verification Error:", error); // Log the error
        return res.status(403).json({
          message: "Invalid or expired token, please log in again.",
          error: true,
          success: false,
        });
      }
    
      console.log("Decoded Token:", decoded); // Log the decoded token
      req.userId = decoded?._id;
      next();
    });
    

     

   
  } catch (error) {
    // General error handling
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}
