const express = require("express");

const app=express();
app.use("/test",(req,res)=>{
res.send("hello from the server");
})
app.use((req,res)=>{
    res.send("hello from the server new");
    })

app.listen(3000,()=>{
    console.log("Server has been listeing sucessfully listeing to port 3000");
});

