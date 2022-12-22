
const express=require("express")
const cors =require("cors");
const ejs = require("ejs");
const { urlencoded } = require("express");
const app = express();
require("./config/database");
require("dotenv").config();
require("./config/passport");
const User=require("./models/user.model")
//hashing
const bcrypt =require("bcrypt");
const saltRounds =10;

//session 
const passport = require("passport");
const session =require("express-session");
const MongoStore = require("connect-mongo");

//these for use
app.set("view engine","ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

///session code
app.set("trust proxy", 1);//trust first proxy
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        //will create DB
        store: MongoStore.create({
            mongoUrl : process.env.MONGO_URL,
            //collection name for session
            collectionName: "session",

        }),
        //cookie:{secure: true},
    })
);
//initialize passport
app.use(passport.initialize())
app.use(passport.session())

// base url
app.get("/",(req,res)=>{
    res.render("index")

})

// to use user register 

//register : get
app.get("/register",(req,res)=>{
    res.render("register")

})
//register : post
app.post("/register",async(req,res)=>{
    
 try {
const user= await User.findOne({username: req.body.username});

 if(user) return res.status(400).send("user is already exist");

 //if user are not in data base then we will hashing
 bcrypt.hash(req.body.password, saltRounds,  async(err ,hash)=>{

    const newUser = new User({
        username : req.body.username,
        password : hash
    });
    await newUser.save();
    res.status(201).redirect("/login");
 })



    } catch (error) {
        res.status(500).send(error.message);
    }

})
//Check LoggedIn
const checkLoggedIn = (req,res, next) =>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
}

//login :get
app.get("/login",checkLoggedIn,(req,res)=>{
    res.render("login");

})
//login: post
app.post(
    "/login",
    passport.authenticate("local",
    { failureRedirect: "/login", 
    successRedirect:"/profile"})

)
//authenticating/protecting profile
const checkLAuthenticated = (req,res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

//profile protected route    (//if user is authenticate then user can go to profile
app.get("/profile",checkLAuthenticated, (req,res)=>{
   res.render("profile");
})

//logout route
app.get("/logout",(req,res)=>{
    try {
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect("/")
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports= app;


