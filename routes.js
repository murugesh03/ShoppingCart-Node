const fs = require("fs");

const routeEvenHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter the message ths is acass</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"></input><button type="submit">Save</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  console.log(method, url, "===> method and url");
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk, "this is chunk");
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message, "this is parsed body");
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node JS</title></head>");
  res.write("<body><h1> This is node JS server</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = routeEvenHandler;
