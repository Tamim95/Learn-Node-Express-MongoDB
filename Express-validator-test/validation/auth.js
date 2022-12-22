const { check } = require("express-validator");

exports.userRegistrationValidator=[
     //input validation
//now we do input validaton here .we took body() from express validation
check("name")//forasmuch we use middle ware so ww se check
.trim()
.notEmpty()
.withMessage("Name is missing")
.isLength({min:5})
.withMessage("name must have at least 5 chareacter")
.isLength({max:31})
.withMessage("name maxi have 31 chareacter"),

check("email")
.trim()
.notEmpty()
.withMessage("email is missing")
.isEmail()
.withMessage("not a valid email"),

check("password")
.trim()
.notEmpty()
.withMessage("password is missing")
.isLength({min:5})
.withMessage("password must have at least 5 chareacter"),

check("dob")
.trim()
.notEmpty()
.withMessage("dob is missing")
.isISO8601()
.toDate()
.withMessage("not a valid date of birth"),


];

//user login validation

exports.userLoginValidator=[
    check("email")
    .trim()
    .notEmpty()
    .withMessage("email is missing")
    .isEmail()
    .withMessage("not a valid email"),
    
    check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({min:5})
    .withMessage("password must have at least 5 chareacter"),
    

]