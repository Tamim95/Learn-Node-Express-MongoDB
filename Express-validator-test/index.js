//->npm init -y
//-> npm install express nodemon
//-> npm install --save express-validator

const { body } = require("express-validator");


const express=require("express");
const userRoutes = require("./routes/user");

const app=express();

const port = 3009;

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});

//user can get user data by this code
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//use use route
app.use("/api",userRoutes)


app.get("/test",(req,res)=>{
    res.send("testing the server.");
})







//we want to register a user
// will have these data of this user name,email,password,dob
// returning in this route  api/register