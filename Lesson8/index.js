//->cd Lesson8  ->npm init -y 
//use external package so ->npm install express nodemon (<-packagename)
//forasmuch we use express so use require express

//const express = require('express');
//const app = express();
//const PORT=3000;
//we keep simple index.js so code move in app.js file
const app = require('./app')
const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);

});
