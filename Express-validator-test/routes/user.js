
const express=require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/user");
const { runValidation } = require("../validation");
const { userRegistrationValidator, userLoginValidator } = require("../validation/auth");

const userRoutes = express.Router();



//name, email , password , dob
//CREATE
userRoutes.post("/register",

userRegistrationValidator,runValidation,registerUser);


// login
userRoutes.post("/login", userLoginValidator,runValidation,loginUser

);



module.exports= userRoutes;