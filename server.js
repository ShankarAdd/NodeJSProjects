const http = require("http");

const linkOfJsFile=require('./routes');

const server = http.createServer(linkOfJsFile.handler);

server.listen(4000);
