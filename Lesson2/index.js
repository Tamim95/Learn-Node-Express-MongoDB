const fs= require('fs');

// fs.writeFile("demo1.txt","This is sample text",function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successful");
//     }
// })

//to add data in exist file.
// fs.appendFile('demo1.txt','this is Anisul Islam and i am 30 years old', (err)=>{
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Successful");
//     }
// }) 

//to REad
// fs.readFile('demo1.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// });

//to  rename file
// fs.rename('demo1.txt','demo2.txt',(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("succesesful");
//     }
// })

//To delete a file
// fs.unlink('demo2.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('successful');
//     }
// })

//to check file has or has not
fs.exists('demo2.txt',(result)=>{
    if(result){
        console.log("found");
    }else{
        console.log("not found");
    }
})