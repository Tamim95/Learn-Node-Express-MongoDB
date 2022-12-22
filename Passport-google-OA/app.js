
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

//Authenticate Requests
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: "/profile" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


//authenticating/protecting profile
const checkLAuthenticated = (req,res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

//profile protected route    (//if user is authenticate then user can go to profile
app.get("/profile",checkLAuthenticated, (req,res)=>{
   res.render("profile",{username : req.user.username});
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


