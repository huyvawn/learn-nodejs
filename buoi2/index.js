const express = require('express')
const http = require('http');
const app = express();
const path = require('path')
app.use(express.static('public'))
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.listen(4000,()=>{
    console.log("App listening on port 4000")
})

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/dienthongtin",(req,res)=>{
    res.render("dienthongtin")
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'contact.html'))
})

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})

app.get("/about",(req,res)=>{
    res.end("The about page")
})



// const server = http.createServer((req,res)=>{
//     console.log(req.url)
//         res.end('Hello World')
// });
// server.listen(3000);