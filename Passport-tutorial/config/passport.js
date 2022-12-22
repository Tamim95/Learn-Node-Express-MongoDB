const User= require("../models/user.model")

//requiring passport
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;


passport.use(
    new LocalStrategy( async (username, password, done)=>{
        try {
            const user = await User.findOne({username: username});
            if (!user) { 
                return done(null, false, {message: "Incorrect Username"}); 
            }
            if(!bcrypt.compare(password, user.password))
            {
                return done(null, false, {message: "incorrect password"});  
            }
            return done(null, user);
        } catch (error) {

           
                return done(err); 
          
            
        }

    //   User.findOne({ username: username }, function (err, user) 
    //   {
       
        
    //     if (!user.verifyPassword(password)) { 
    //         return done(null, false);
    //      }
        
    //   });
    }
  ));

  //create session id
  //whenever we login it create user id inside session
  passport.serializeUser((user, done)=>{
    done(null, user.id);

  });
  //find session info using  session id
  passport.deserializeUser(async(id,done)=>{
   try {
    const user =await User.findById(id);
    done(null, user);
   } catch(error) {
    done(error,false);
   }
  })

