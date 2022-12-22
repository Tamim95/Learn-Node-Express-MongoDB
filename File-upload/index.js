
//->npm init -y  
//->npm install express
//for test ->node index.js
// to upload file in server we need help of npm package which is multer
// go// npmjs.com/package/multer   search multer 
//we can upload image in our server by multer
//-> npm install --save multer
// READ usage >DiskStorage code have to copy
//read usage ---Don't forget the enctype="multipart/form-data" in your form.
//  install mongoose ->npm install mongoose

const express=require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const app=express();
//we use two middle ware because we receive data in body so.
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const port = 8005;

//connecting to DATABASE
const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/usersTestDB");
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
        console.log(error);
        process.exit(1);
    }
}

//we store file name in db
//creating schema and model
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "user name is required"]
    },
    image: {
        type: String,
        required:[true, "user image is required"]
    }
});

//Model
const User= mongoose.model("Users",userSchema);//"Users" is a collection name that will follow userSchema structure


//file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const name = Date.now()+ "-"+ file.originalname;
      cb(null,name);
    }
  })
  
  const upload = multer({ storage: storage })

  app.get("/register",(req,res)=>{
    res.status(200).sendFile(__dirname + "/index.html");
})

//when we do post request then use use upload.single("exact name of file's name property that was 'image' in our index.html file") <- this is middle ware
app.post("/register",upload.single("image"), async(req,res)=>{
    //at first we store data to DB before response
try {
    const newUser =new User({
        name: req.body.name,
        image: req.file?.filename,
    });
    await newUser.save();
    res.status(201).send(newUser);
} catch (error) {
    res.status(500).send(error.message);
}
    
})



app.listen(port,async()=>{
    console.log(`server is running at http://localhost:${port}`);
    //here calling DATABASE
    await connectDB();
})