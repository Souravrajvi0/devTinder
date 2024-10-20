const mongoose = require('mongoose');
var validator = require('validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    lastName:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
        

    },
    age:{
        type:Number,
        min:18
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
      
        
    },
    gender:{
        type:String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("Gender is not valid");
          }
        }
    },
    about:{
        type:String,
        default:"THIS IS THE JUST DEFAULT VALUE OF THE USER"
    },
    photourl:{
        type:String,
        default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        
    },
    skills:{
        type:[String]
    }

},{
    timestamps:true
})
userSchema.methods.getJWT= async function () {
    const user=this;
    const token= await jwt.sign({_id:user._id},"DEV@Tinder$799",{
        expiresIn:"2d",
    });
    return token;
    
}
userSchema.methods.validatePassword= async function (passwordInputByUser) {
    const user= this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}
module.exports=mongoose.model("User",userSchema);