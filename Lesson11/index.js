
const express=require("express");
const app = express();
const PORT=3000;
//middleware: it is a function. there will have 3 properties / method such as 
//(req,res,next)=>{ }
const myMiddleWare=(req,res,next)=>{
    console.log("middle ware function"); 
    req.currentTime=new Date(Date.now());
    next();
}

//so that all can use this middle ware
app.use(myMiddleWare);
app.use((req,res,next)=>{ //this error handling middle ware
    res.send("404 bad url request");
})
app.use

// app.get("/",myMiddleWare,(req,res)=>{
//     console.log("I am about."+req.currentTime);
//     res.send("<h1>I am at about route</h1>");
// });
app.get("/",(req,res)=>{
    console.log("I am home."+req.currentTime);
    res.send("<h1>I am at home route</h1>");
});
app.use((err,req,res,next)=>{
    res.status(500).send("something broke");
});

app.get("/about",(req,res)=>{
    console.log("I am about."+req.currentTime);
    res.send("<h1>I am at about route</h1>");
});

// app.get("/about",myMiddleWare,(req,res)=>{
//     console.log("I am home."+req.currentTime);
//     res.send("<h1>I am at home route</h1>");
// });



app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});