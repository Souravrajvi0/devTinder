const express = require("express");
const connectDB = require('./config/database');
const cookieParser=require("cookie-parser");
const app=express();
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
.then(()=>{
    app.listen(3000,()=>{
      console.log("Server has been listeing sucessfully listeing to port 3000");
    });
})
.catch((error)=>{
    console.log(error);
});




