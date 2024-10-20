const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/adminauth.js");


requestRouter.post("/sendConnectionRequest", async (req,res) => {
    
})

module.exports=requestRouter; 
