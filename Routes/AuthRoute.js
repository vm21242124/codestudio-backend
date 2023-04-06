import express  from "express";
import { login, registerUser } from "../Modules/AuthModel.js";
const router =express.Router();
router.post('/register',registerUser)
router.get("/login",login);
export default router