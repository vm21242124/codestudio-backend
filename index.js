import express from "express";
const app=express();
app.listen(5000,(err)=>{
    if(!err){
        console.log("server on");
    }else{
        console.log(err);
    }
})