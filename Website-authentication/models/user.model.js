

const mongoose=require('mongoose');
// //for encryption
// const encrypt= require("mongoose-encryption");

//add "new" keyword
const userSchema = new mongoose.Schema({ 
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    createdOn: {
    type: Date,
    default: Date.now,
    },

});



// //importing ENC_KEY from .env file for encrypting
// const encKey = process.env.ENC_KEY;

// // encrypt age regardless of any other options. name and _id will be left unencrypted
// //see "Secret String Instead of Two Keys" here
// userSchema.plugin(encrypt, {
//      secret : encKey,
//      encryptedFields: ["password"], });


module.exports= mongoose.model("user",userSchema);