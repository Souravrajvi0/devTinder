const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/adminauth.js");
const ConnectionRequest=require("../models/connectionRequest.js");
const User=require("../models/user.js");


requestRouter.post("/request/send/:status/:toUserId", userAuth,async (req,res) => {
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];
        console.log("1")
        if(!allowedStatus.includes(status)){
            return res.status(400).json({mesaage:"invalid status: "+ status});
        }
         // checking if the user we're sending request to actually exists in the database
         console.log(toUserId);
         const toUser=await User.findById(toUserId);
         if(!toUser){
             return res.status(404).json({message:"User is not in out DB"});
         }
        // Now we need to check if their already exists a connection request between these two users
        console.log("2")

        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                { fromUserId:fromUserId,toUserId:toUserId,},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
            })
            if(existingConnectionRequest){
                return res.status(404).json({message:"Connection Request Already present"});
            }
            console.log("3")

           
            // Now what if I send a connection request to myself
            console.log("4")

   
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        console.log(connectionRequest);

    const data= await connectionRequest.save();
    res.status(200).send({
        message:"Connection Request Sent Successfully",
        data,
    })


    }catch(error){
        res.status(500).send("Something went wrong: "+error.message);
    }
})
requestRouter.post("/request/review/:status/:toUserId", userAuth,async (req,res) => {
    try{
        const loggedInUser=req.user;
        const{status,toUserId}=req.params;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("STATUS IS NOT VALID");
        }
        const connectionRequest= ConnectionRequest.findOne({
            fromUserId:toUserId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
        if(!connectionRequest){
            return res.status(404).send("NO REQUEST PRESENT");
        }
        connectionRequest.status=status;
        
        const data= await connectionRequest.save();
        res.json({message:"Connection request "+ status,data});
        

    }catch(error){
        res.status(500).send("Something went wrong: "+error.message);
    }
});
module.exports=requestRouter; 
