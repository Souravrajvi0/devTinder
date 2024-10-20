const express = require("express");
const connectDB = require('./config/database');
const cookieParser=require("cookie-parser");
const app=express();
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth.js");
const profileRouter=require("./route/profile.js");
const requestRouter=require("./routes/request.js");








  



connectDB()
.then(()=>{
    app.listen(3000,()=>{
      console.log("Server has been listeing sucessfully listeing to port 3000");
    });
})
.catch((error)=>{
    console.log(error);
});




