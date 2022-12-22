//os, path
// const { totalmem, freemem}=require("os");

//const os=require("os");
//console.log(os.homedir());
//console.log(os.hostname());
//console.log(os.userInfo());
// console.log(os.totalmem());
// console.log(os.freemem());

// console.log(__dirname);
// console.log(__filename);

const path= require("path");
// const extensionName=path.extname("index.html");
// console.log(extensionName);
// const joinName=path.join(__dirname+"/views"); ->>>C:\Users\TNF\Desktop\NodeJsBasic\Lesson3\views
const joinName=path.join(__dirname+"/../views"); //->>>C:\Users\TNF\Desktop\NodeJsBasic\views
console.log(joinName);

