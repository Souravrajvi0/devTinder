const express=require("express");
const authRouterrouter=express.Router();
const bcrypt=require("bcrypt");
const User=require("../models/user.js");
const {validSignUpData}=require("../utils/validation.js");

authRouter.post("/signup", async(req,res)=>{
  
try{
      // FIRST WE CAN CAN VALIDATE THE WHOLE REQUEST
    validSignUpData(req);
    // BEFORE SAVING WE NEED TO ENCRYPT THE PASSWORD RIGHT
     const {password,firstName,lastName,emailId}=req.body;
     const passwordHash=await bcrypt.hash(password,10);
     // 10 ek standard number hai number of salts k liye
  
    //  Creating a new instance of the model , This is a better way to that , pehle destrcuture karlo
    const user= new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
     await user.save();
     res.send("User added  successfully")
    }catch(error){
    res.status(500).send("Something went wrong 0"+ error);
    }
  });

authRouter.post("/login",async(req,res)=>{
    try{
     const {emailId,password}=req.body;
     const user=await User.findOne({emailId:emailId});
     if(!user){
      res.send("Invalid credentials");
     }
     const isPasswordValid=await user.validatePassword(password);
     if(!isPasswordValid){
       throw new Error("Wrong Password");
     }else{
     // IN THIS BLOCK WE WILL ENTER WHEN WE WILL BE SUCCESFULLY LOGGED IN
     // CREATE A JWT TOKEN 
     let token = await user.getJWT()
  // ADD THE TOKEN TO THE COOKIE AND SEND THE RESPONSE BACK TO THE USER
      res.cookie("token",token);
      res.send("Login Sucessfully");
     }
     }catch(err){
     res.status(400).send("ERROR IS COMING"+ err.message);
    }
  })
module.exports=authRouter;