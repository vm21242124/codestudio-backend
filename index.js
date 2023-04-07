import express from "express";
import dotenv from "dotenv";
import { connection } from "./connection/Conn.js";
import AuthRoute from "./Routes/AuthRoute.js";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
const app = express();

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

try {
   mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((console.log("connected to db"))).catch((e)=>console.log(e))
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("server on");
  } else {
    console.log(err);
  }
});
app.use("/auth", AuthRoute);
