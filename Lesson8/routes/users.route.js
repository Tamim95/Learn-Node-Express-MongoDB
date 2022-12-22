
const express=require('express');
const router=express.Router();

// router.get("/",(req,res)=>{
//     res.send("<h1>I am a get request at a home route</h1>");
//     res.end();
// });
// http://localhost:3000/api/user/register

router.get("/register",(req,res)=>{
    res.send("<h1>I am a get request at a register route</h1>");
    res.end();
});
router.get("/login",(req,res)=>{
    res.send("<h1>I am a get request at a login route</h1>");
    res.end();
});
// router.post("/",(req,res)=>{
//     res.send("I am a post request at home route");
//     res.end();
// });
// router.put("/",(req,res)=>{
//     res.send("I am a put request at a home route")
//     res.end();
// });
// router.delete("/",(req,res)=>{
//     res.send("I am a delete request at a home route")
//     res.end();
// });

module.exports=router;
