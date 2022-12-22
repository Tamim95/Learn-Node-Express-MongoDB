
const http=require('http');
const port=3000;
const hostname='127.0.0.1' //this is local host address
const myServer= http.createServer((req,res)=>{
    res.end("<h1> Hello ,I am your first server</h1>");
});
myServer.listen(port,hostname,()=>{
  //  console.log('Server is running successfully at http://${h} ');
console.log( `server is running successfully at http://${hostname}:${port}`);
});