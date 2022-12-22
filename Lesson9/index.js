
// -> npm init -y
//-> npm install express nodemon

const express= require("express");
const app=express();
const PORT=3001;
const bodyParser=require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/register",(req,res)=>{
    const fullName=req.body.fullName;
    const age=req.body.age;
res.send(`<h2>your name is ${fullName} and Age is :${age} </h2>`);
});




//04: we send data from frontend then we receive data using post()method
// app.post("/user",(req,res)=>{
//     //search body parser ->npm install body-parser
//     const name=req.body.name;
//     const age=req.body.age;
//     res.send(`welcome ${ name}. You are ${ age}.`);
// })

//01: getting student id using query parameter
// localhost:3001/?id=101&age=30
// app.get("/",(req,res)=>{
//     const id = req.query.id;
//     const name= req.query.name;
//     // const {id,name}=req.query; //we can distructuring and can use this
//     res.send(`<h1>Student id is:${id},name is:${name}</h1>`);
    
// })

// //02:getting student id and name use route parameter ->userId
// app.get("/userId/:id/userAge/:age",(req,res)=>{
//     const id=req.params.id;
//     const age=req.params.age;
//     res.send(`<h1>Student id is:${id},age is:${age}`)
// })

//03: request with header
// app.get("/",(req,res)=>{
//     const id=req.header('id');
//     const name=req.header('name');
//     res.send(`<h1> student id is:${id}, name is:${name} </h1>`);
// })



app.listen(PORT,()=>{
    console.log(`Server is runnong at http://localhost:${PORT}`);

})

