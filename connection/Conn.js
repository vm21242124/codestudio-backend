import mongoose from "mongoose";

export const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((console.log("connected to db"))).catch((e)=>console.log(e))
  } catch (error) {
    console.log(error);
  }
};
