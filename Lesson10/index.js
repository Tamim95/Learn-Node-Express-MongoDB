//->npm init -y
//->npm install express
//to run server ->node index.js
//we can keep PORT in environment variable
// so step 01: we create a .env file under root directory/Lesson10
//we can keep PORT in environment variable file

require('dotenv').config(); //this code is for env variable to get value
const express=require("express");
const app=express();
const PORT=process.env.PORT || 3000;


app.get("/",(req,res)=>{
    res.send("Hello I am a home route");
})
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);

});

