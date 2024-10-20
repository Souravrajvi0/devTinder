






























/////////
app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;
try{
 const users= await User.find({emailId:userEmail});
 if(users.length===0){
  res.status(404).send("User Not found");
 }else{
  res.send(users);
 }
  }catch(error){
    res.status(400).send(" SOMETHING WENT WRONG1");
  }
})


app.get("/feed",async(req,res)=>{
  try{
    const users=await User.find({});
    res.send(users);
  }catch(error){
    res.status(500).send("SOMETHING WENT WRONG2");
  }

})

app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    await User.findByIdAndDelete({_id:userId});
    res.send("User Deleted Sucessfully");
  }catch(error){
    res.status(500).send("Something went wrong3");
  }
})


app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
 
  try{
    const ALLOWED_UPDATES=[
      "photourl","about","url","gender","about","skills","password"
    ]
    
    const isUpdateAllowed=Object.keys(data).every(k =>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
      throw new Error("Update Not allowed");
    }
    if(data?.skills.length>100){
      throw new Error("skills can't be more than 10");
    }
    await User.findByIdAndUpdate({_id:userId},data);
    res.send("User Updated Sucessfully");
  
  }catch(error){
    res.status(500).send("Something went wrong4"+ error);
  }
  })
