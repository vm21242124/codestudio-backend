import express  from "express";
import { registerUser } from "../Modules/AuthModel.js";
const router =express.Router();
router.post('/register',registerUser)
export default router