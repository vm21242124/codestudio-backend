import userDB from "../Schema/UserSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const  {firstname, lastname, email, mobileno, password, cpassword }=req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !mobileno ||
    !cpassword ||
    !password
  ) {
    console.log("i am calling");
    res.status(400).json("enter all the details");
    return;
  }
  try {
      const olduser = await userDB.findOne({email});
    if (!olduser) {
      const salt = await bcrypt.genSalt(11);
      const hashpass = await bcrypt.hash(password, salt);
      if (password == cpassword) {
        const user = await userDB.create({
          firstname,
          lastname,
          mobileno,
          email,
          cpassword: hashpass,
          password: hashpass,
        });
        res.status(201).json(user);
      }
    } else {
      res.status(400).json("you have registered with kindly login");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
