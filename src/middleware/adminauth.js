const jwt=require("jsonwebtoken");
const User=require("../models/user.js");
const userAuth= async(req,res,next) =>{
// READ THE TOKEN FROM THE REQUEST
try{
const{token}=req.cookies;
if(!token){
    throw new Error("token is not valid");
}
const decodedobj= await jwt.verify(token,"DEV@Tinder$799");
const {_id}=decodedobj;
const user=await User.findById(_id);
if(!user){
    throw new Error("User not found");
}
req.user=user;
next();
}catch(error){
    res.status(400).send("Something went wrong"+ error.message);
}

}
module.exports={
    userAuth
}