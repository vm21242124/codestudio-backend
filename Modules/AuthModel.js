import userDB from "../Schema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  const  { firstname, lastname, email, mobileno, password, cpassword } =req.body;
  const required =!firstname || !lastname || !email || !mobileno || !cpassword || !password? true: false;
  if (required) {
  
    res.status(400).json("enter all the details");
    return;
  }
  try {
    const olduser = await userDB.findOne({ email });
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if(email && password){
    try {
        const findUser=await userDB.findOne({email});
        if(findUser){
            const pass=await bcrypt.compare(password,findUser.password);
            if(pass){
                const token=jwt.sign({_id:userDB._id},"jsonwebtoken")
                res.cookie("token",token,{
                  httpOnly:true,
                  expires:new Date(Date.now()+60*1000)
                })
                res.status(200).json("logged in successfully")
                
            }else{
                res.status(401).json("password is not matching ")
            }
        }else{
            res.status(404).json("user not found create new account")
        }
    } catch (error) {
     res.status(500).json(error)   
    }
  }else{
    res.status(403).json("all field are required")
  }
};
export const isAuthenticated=(req,res,next)=>{
  const {token}=req.cookies;
  if(token){
    jwt.verify(token,"jsonwebtoken");
    next();
  }
}