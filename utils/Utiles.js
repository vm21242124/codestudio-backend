import jwt from 'jsonwebtoken'
import userDB from '../Schema/UserSchema.js';
export const sendcookies = (user,res,message,statuscode=200) => {
  const token = jwt.sign({ _id: userDB._id }, "jsonwebtoken");
 

  res.status(statuscode).cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  }).json({
    success:true,
    message
  })
};
