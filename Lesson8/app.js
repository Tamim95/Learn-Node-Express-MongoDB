const express = require("express");
const app = express();
const userRouter=require("./routes/users.route");


app.use("/api/user",userRouter);

app.use("/register",(req,res)=>{
    res.statusCode=200;
    res.sendFile(__dirname+"/views/register.html");
});

// app.get("/login",(req,res)=>{
//     res.cookie("name","rabeya");
//     res.cookie("age","30");
 
//     res.clearCookie("name");
//     res.append("id","111222");
//     res.end();
// });

app.use("/",(req,res)=>{
    res.statusCode=200;
    res.sendFile(__dirname+"/views/index.html");
});




//if user send wrong request the server response this
app.use((req,res)=>{
    res.send("<h1>404 !! Not a valid url</h1>");
})

module.exports=app;

// app.use("/register",(req,res)=>{ --> to redirect in to login page and to see json file 
//     res.status(200).json({
//         message:"I am register",
//         statusCode:200,
//     });
//     res.redirect("/login");
// })