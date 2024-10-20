const express=require("express");;

const profileRouter=express.Router();
const {userAuth}=require("../middleware/adminauth.js");
const User=require("../models/user.js");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      if (!req.user) {
        throw new Error("User information is missing");
       }
      
    res.send(req.user); // Send the authenticated user's details
    }catch(error){
      res.status(400).send("Something went wrong"+ error.message);
    }
    });
    
  profileRouter.patch("/profile/edit",userAuth,async (req,res) => {
      try{
        const data=req.body;
        const ALLOWED_UPDATES=[
            "photourl","about","url","gender","about","skills","password"
          ]
       const isUpdateAllowed=Object.keys(data).every(k =>ALLOWED_UPDATES.includes(k));
          if(!isUpdateAllowed){
            throw new Error("Update Not allowed");
          }
       
          console.log(req.user._id.toString());
          await User.findByIdAndUpdate({_id:req.user._id.toString()},data);
       

          res.send("User Updated Sucessfully");
        

    }catch(error){
        res.status(400).send("Something went wrong "+error.message);
    }

    
  })  
    module.exports=profileRouter;