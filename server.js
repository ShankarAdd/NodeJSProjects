const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  //console.log(req);
  //console.log(req.url, req.method, req.headers);
//   if (req.url == "/home") {
//     res.write("<html>");
//     res.write("<head><title>Home page</title><head>");
//     res.write("<body><h1>Welcome home</h1><body>");
//     res.write("</html>");
//     return res.end();
//   } else if (req.url == "/about") {
//     res.write("<html>");
//     res.write("<head><title>About page</title><head>");
//     res.write("<body><h1>Welcome to About Us page</h1><body>");
//     res.write("</html>");
//     return res.end();
//   } else if (req.url == "/node") {
//     res.write("<html>");
//     res.write("<head><title>Node page</title><head>");
//     res.write("<body><h1> Welcome to my Node Js project</h1><body>");
//     res.write("</html>");
//     return res.end();
//   }
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    fs.readFile("message.txt",{encoding: "utf-8"}, (err,data) =>{
        if(err){
        console.log(err);
        }
        res.write("<html>");
        res.write("<head><title>My First Page</title><head>");
        res.write(`<body>${data}</body>`)
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form><body>');
        res.write("</html>");
        return res.end();
        });
  }
  else if(req.url == "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message,(err) =>{
            if(err){
                console.log(err);
            }
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
      });
    });
  } 
});
server.listen(4000);