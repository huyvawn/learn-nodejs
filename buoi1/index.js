const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data)=> {
        if (err){
            res.statusCode = 500;
            res.setHeader('Content-Type','text/plain');
            res.end('Loi may chu');
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
});
// const server = http.createServer((req, res) =>
// {
//     res.statusCode= 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end("Hello world");
// }
// );

server.listen(port,hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`);
});