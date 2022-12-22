
const http=require('http');
const port=3000;
const hostname='127.0.0.1' //this is local host address
const myServer= http.createServer((req,res)=>{
    res.writeHead(202,{'Content-type':'text/html'});
    res.write("<h1>Hello from server</h1>");
    res.write("<h1>Hello from server</h1>");

    res.end("<h1> Hello ,I am your first server</h1>");
});
myServer.listen(port,hostname,()=>{
  //  console.log('Server is running successfully at http://${h} ');
console.log( `server is running successfully at http://${hostname}:${port}`);
});