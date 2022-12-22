//->npm init -y
//->npm install express
//->npm install -D nodemon  <-D mean development dependencies
//we store port,sql,
//mongoosejs.com  have to read this document
//->npm install mongoose

const express=require("express");
const mongoose=require("mongoose");

const app=express();

const port=3002;

//we using middle ware to receive json data from users
app.use(express.json())
//we using middle ware to receive form data from users
app.use(express.urlencoded({extended:true}))

//create product schema
const productsSchema= new mongoose.Schema({
    title: {
        type:String,
        required:[true, "product title is required"],//required:true //for validation
        minlength:[3,"minimum length of the product title should be 3"], //validation wwww.mongoosejs.com ..mongoose validation see
        maxlength:[100,"maximum length of the product title should be 10"],
        lowercase: true, // or // uppercase:true
        trim: true ,// ....iphone15...
        // validate:{ //this is custom validation
        //     validator: function(v){
        //         return v.length===10;
        //     },
        //     message: (props)=>`${props.value} is not a valid title`,

        // },
        
        // enum: {
        //     values: ["iphone18","samsung"],
        //     message: "{VALUE} is not supported",
        // },    //enum: ["iphone","Samsung"]

    },
     price:{
        type:Number,
        min: [200, "minimum price of the product should be 200"],
        max: [2000, "maximum price of the product should be 2000"],
        required:true
     },
     rating:{
        type:Number,
        required:true
     },
    //  email:{
    //     type: String,
    //     unique: true, 
    //  },
    description:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required: [true, "phone number is required"],
        validate: {
            validator: function (v){
                return  /\d{3}-\d{3}-\d{4}/.test(v); //number validation //regular expression
                // const phoneRegex=/\d{3}-\d{3}-\d{4}/;
                // return phoneRegex.test(v);
            },
            message: (props)=>`${props.value} is not a valid phone number`
        },
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
//create product model(here "Products" is collection.It is always small letter and plural in DB even you enter Singular and plural)
const Product=mongoose.model("Products",productsSchema);



//connecting mongo to express js
//localhost address=127.0.0.1

// mongoose.connect('mongodb://127.0.0.1:27017/testProductDB')
// .then(()=>console.log("db is connected"))
// .catch((error)=>{
//     console.log("db is not connected");
//     console.log(error);
//     process.exit(1);
// });

//connecting DB by async() Function
const connectDB = async()=>{ //if you use await then this function will async
try{
    await  mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
    console.log("db is connected");
}catch(error){
    console.log("db is not connected");
    console.log(error.message);
    process.exit(1);
}

};


app.listen(port,async()=>{//using async() fun here
    console.log(`server is running at http://localhost:${port}`);
    await connectDB();//calling db
});

app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

//Create
app.post("/products",async (req,res)=>{
    try{
        //get data from request body
       const title=req.body.title;
       const price=req.body.price;
       const rating=req.body.rating;
       const description=req.body.description;
       const phone=req.body.phone;

       //now we store data using model (our model was Product)
    const newProduct= new Product({
    title: title, //(these has come from request body)
    price: price, 
    rating: rating, 
    description: description,
    phone:phone,
//or 
// title:req.body.title,
// price:req.body.price,
// rating:req.body.rating;
// description:req.body.description,
// phone:req.body.phone;

});
//now saving this newProduct
const productData = await newProduct.save();

       res.status(201).send(productData);
    } catch(error){
        res.status(500).send({message: error.message});
    }
})

//GET:/products->Return all the products (READ)
app.get("/products",async(req,res)=>{
    try {
        //finding data by model
        const price=req.query.price; //http://localhost:3002/products?price=3002
       const rating=req.query.rating;
      let products;
      
    if(price && rating){
             products = await Product.find(
                //logical operator
             {$or:[
                {price:{$gt:price }}, 
                {rating:{$gt:rating}}]}//or ,and ,nor ,operator
             );//.sort({price: 1}).select({title:1}); //.countDocuments();//.find({price:{$gt:300}});

        }else{
            products=await Product.find(); // .sort({price: 1}).select({title:1}); //.select({title:1}) to see property 1= will see 0=wont see //.sort({price: 1}) 1=ascending order -1=descending order
        }
        
        if(products){
            res.status(200).send({
                success:true,
                message:"return single product",
                data: products,
        });
        } else{
            res.status(404).send({
                success:false,    
                message: "products not found"})

        }
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }

});

//GET:/products/:id->return a specific product
app.get("/products/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        //finding data by model
       const product = await Product.findOne({_id:id})//.select({title:1,price:1,_id:0});

       if(product){

            res.status(200).send({
            success:true,
            message:"return single product",
            data: product
    });
        } else{
            res.status(404).send({
            success:false,    
            message: "product was  not found with this id",
        });

        }
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }

});

//Delete
app.delete("/products/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        //deleting by "Product" model
      const product= await Product.deleteOne({_id: id});//another method //.findByIdAndDelete({_id:id})
      if(product){
        res.status(200).send({
            success:true,
            message: "deleted single product",
            data: product,
        });
      }else{
        res.status(404).send({
            success:false,
            message: "product was  not deleted with this id",
        })
      }

    }catch(error){
        res.status(500).send({message:error.message});
    }
});

//Update
app.put("/products/:id",async(req,res)=>{
    try{
    const id=req.params.id;
   
     const updatedProduct =  await Product.findByIdAndUpdate(
        {_id:id},//.findByIdAndUpdate({_id:id})
        {
            $set: {
                title:req.body.title,
                price:req.body.price,
                rating: req.body.rating,
                description:req.body.description,
                
    },   
},
{new:true}//for response update
);
   if(updatedProduct){
    res.status(200).send({
        success: true,
        message: "updated single product",
        data: updatedProduct,
    });
   }else{
    res.status(404).send({
        success:false,
        message:"product was not updated with this id",
    });
   }


    }catch(error){
        res.status(500).send({message:error.message});
    }
});




//POST:/products->Create a product
//GET:/products->Return all the products
//GET:/products/:id->return a specific product
//PUT:/products/:id->update a product
//DELETE: /products/:id ->delete a product based on id

//now saving this newProduct for multiple multiple document
// const productData=await Product.insertMany([
// {
//     title:"Oppo A50",
//     price: 250,
//     description:"Camera phone"
// },
// {
//     title:"Redmi 11",
//     price:300,
//     description:"Speedy phone"
// }
// ])


//DATABASE->collections(table)->document(record)