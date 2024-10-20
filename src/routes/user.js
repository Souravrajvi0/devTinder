const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/adminauth.js");;
const User=require("../models/user.js");
const ConnectionRequest=require("../models/connectionRequest.js");
userRouter.get("/user/requests",userAuth,async (req,res) => {
// GET ALL THE PENDING CONNECTION REQUESTS FOR THE LOGGED IN USER
const loggedInUser=req.user;
const connectionRequests=await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested",
});
res.json({message:"DATA FETCHED SUCCESSFULLY"},connectionRequests);

    
});
module.exports=userRouter;
