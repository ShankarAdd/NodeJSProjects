const fs = require("fs");
const requestHandler = (req, res) => {
    const url=req.url;
    const method=req.method;
  if (url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.write("<html>");
      res.write("<head><title>My First Page</title><head>");
      res.write(`<body>${data}</body>`);
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form><body>'
      );
      res.write("</html>");
      return res.end();
    });
  } else if (req.url == "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[0];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.log(err);
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

// module.exports =requestHandler;

// module.exports={
//     handler: requestHandler,
//     someText:'This is exporting'
// };

// module.exports.handler=requestHandler;
// module.exports.someText='this is some text';



exports.handler=requestHandler;
exports.someText='this is some text';