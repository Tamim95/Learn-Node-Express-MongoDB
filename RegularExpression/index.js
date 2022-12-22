const express=require("express");
const app=express();
const PORT=3000;

// app.get("/products/:id([0-3]+)",(req,res)=>{
//     res.send(`<h1>ID =${req.params.id}</h2>`);
// })
app.get("/products/:id([0-9]{3})",(req,res)=>{//0 to 9 but maximux 3
    res.send(`<h1>ID =${req.params.id}</h2>`);
})
// app.get("/products/:title([a-zA-Z]+)",(req,res)=>{
//     res.send(`<h1> title=${req.params.title} </h1>`)
// })
app.get("/products/:title([a-zA-Z0-9]+)",(req,res)=>{
    res.send(`<h1> title=${req.params.title} </h1>`)
})


app.use("*",(req,res)=>{
    res.status(404).send({
        message:' not a valid route',
    });
});

app.listen(PORT,()=>{
    //console.log("Server is running at http://localhost:PORT");
    console.log(`Server is running at http://localhost:${PORT}`);
})