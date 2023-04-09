import jwt from "jsonwebtoken";
import userDB from "../Schema/UserSchema.js";

export const isAuthenticated = async (req, res, next) => {
//   const  token  = req.cookies.token;
 
  if (req.cookies.token) {
    const decode = jwt.verify(req.cookies.token, "jsonwebtoken");

    console.log(decode._id)

    req.user = await userDB.findById(decode._id);
    res.status(200).json(req.user)
    return;
  } 
  else {
    next();
  }


};
