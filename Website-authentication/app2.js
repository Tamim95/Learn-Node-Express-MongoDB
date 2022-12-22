//importing .env file so
//DB authentication
require("dotenv").config();
const express=require("express");
const cors= require("cors");
const mongoose = require("mongoose");

//importing userSchema from user.model.js file
const User =require("./models/user.model");

//importing DB url "MONGO_URL"
const dbURL= process.env.MONGO_URL;

mongoose.connect(dbURL).then(()=>{
    console.log('mongo atlas is connected');
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})


const app= express();
const PORT=process.env.PORT || 5000;

app.use(cors());
//so that server can receive data from body
app.use(express.urlencoded({}))
//we work with json file so
app.use(express.json());
//home route
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/./views/index.html");
})

//for create user
app.post("/register", async(req,res)=>{
    //const {email,password}=req.body;
    try {
        const newUser = new User(req.body);
      await  newUser.save();
      res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json(error.message);
    }
   
})

//for login user
app.post("/login",async(req,res)=>{
    try {
       const {email,password} =req.body;
       const user =await User.findOne({email:email});
       if(user && user.password===password){
        res.status(200).json({status:'valid user'})
       }
       else{
        res.status(404).json({status:'not valid user'})
       } 
    } catch (error) { 
        res.status(500).json(error.message);
    }
   
})


//route not found error
app.use((req,res,next)=>{
    res.status(404).json({
        message: "route not found",
    })
})
//handling server error
app.use((err,req,res,next)=>{
    res.status(500).json({
        message:"something broke"
    })
})


//we can use PORT by process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})

