import express  from "express";
import { login, registerUser } from "../Modules/AuthModel.js";
import { isAuthenticated } from "../Middlewares/Features.js";
const router =express.Router();
router.post('/register',registerUser)
router.post("/login",isAuthenticated,login);
export default router