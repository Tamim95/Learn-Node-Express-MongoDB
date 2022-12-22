const { check, validationResult } = require("express-validator");

exports.runValidation = (req,res,next)=>{

    //handling validation error
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        let errorsList = errors.array().map((error)=>error.msg)
      return res.status(400).json({ errors: errorsList });
    }
    next(); //if have not error then will go next part
    }
