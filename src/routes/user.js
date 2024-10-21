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
}).populate("fromUserId",["firstName","lastName","photourl"]);
res.send(connectionRequests);    
   
});
userRouter.get("/user/connections",userAuth,async(req,res)=>{
const loggedInUser=req.user;
try{
  const connectionRequests=await ConnectionRequest.find({
     $or:[
        {fromUserId:loggedInUser._id,status:"accepted"},
        {toUserId:loggedInUser._id,status:"accepted"}
     ]
  }).populate("fromUserId",["firstName","lastName","photourl"]);
  res.send(connectionRequests);

}catch(error){
    res.status(400).send("Something went wrong: "+error.message);
}

});
userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
           $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
           ]
        }).select("fromUserId,toUserId");
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId);
        hideUsersFromFeed.add(req.toUserId);
       });
       const users=await User.find({
        $and:[
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}}
        ]
        }
    ).select("firstName lastName photourl");
     res.send(users);
    }  
    catch(error){
        res.status(400).send("Something went wrong: "+error.message);
    }
});

module.exports=userRouter;

