import express from "express";
import dotenv from "dotenv";
import { connection } from "./connection/Conn.js";
import AuthRoute from "./Routes/AuthRoute.js";
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
dotenv.config();

connection();

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("server on");
  } else {
    console.log(err);
  }
});
app.use("/auth", AuthRoute);
