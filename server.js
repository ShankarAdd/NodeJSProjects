const http = require('http');
const server = http.createServer((req,res) =>{
    console.log(req);
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('My name is Shankar');
});
server.listen(4000);