const http = require("http");
const fs = require ('fs');
const server = http.createServer((req,res)=>{
    let FileName="";
    switch(req.url){
        case"/":
        FileName="Index.html";
        break;
        case"/about":
        FileName="About.html";
        break;
        case"/contact":
        FileName="Contact.html";
        break;
        case"/service":
        FileName="Service.html";
        break;
        break;
        default:
        FileName="NotFound.html"
    }
    let data= fs.readFileSync(FileName ,'utf-8')
    res.end(data)
})
    server.listen(8500,()=>{
        console.log("server started at http://localhost:8500");
        
    })