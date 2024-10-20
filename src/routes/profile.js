const express=require("express");;

const profileRouter=express.Router();
const {userAuth}=require("../middleware/adminauth.js");

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
      if (!req.user) {
        throw new Error("User information is missing");
      }
      
      res.send(req.user); // Send the authenticated user's details
    }catch(error){
      res.status(400).send("Something went wrong"+ error.message);
    }
    });
    
    module.exports=profileRouter;