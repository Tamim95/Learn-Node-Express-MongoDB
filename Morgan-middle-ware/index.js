//->npm init -y
//->npm install express moregan
//-> npm install -D nodemon    <---- D mean development dependency
// READ npmjs.com/package/morgan    ....what is morgan 
const express=require("express");
const morgan = require("morgan");
const app=express();

app.use(morgan("dev"));//middle ware..now request related info we can see in console now



//READ
app.get("/products",(req,res)=>{
    res.send("list all the products");
})

//CREATE
app.post("/products",(req,res)=>{
    res.status(201).send("create a  products");//when we create data we have to set status code 201
    
})


app.listen(3000,()=>{
    console.log(`server is running at http://localhost:3000`);

})