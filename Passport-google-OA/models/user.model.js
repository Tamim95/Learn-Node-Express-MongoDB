const mongoose= require("mongoose");
//Schema
const userSchema= mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    googleId:{
        type: String,
        require: true,
    }
  

})

//model
const User = mongoose.model("User",userSchema);
module.exports = User;