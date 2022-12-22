const mongoose= require("mongoose");
//Schema
const userSchema= mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        
    }

})

//model
const User = mongoose.model("User",userSchema);
module.exports = User;