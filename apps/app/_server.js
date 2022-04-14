const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev },
  );
const handle = app.getRequestHandler();
const path = require('path');



const options = {
  key: fs.readFileSync(path.join(__dirname, '../../privateKey.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../certificate.crt'))
}

module.exports = (app) => {
  app.prepare().then(() => {
    createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(4200, (err) => {
      if (err) throw err;
      console.log("> Server started on https://localhost:4200");
    });
  });
}
