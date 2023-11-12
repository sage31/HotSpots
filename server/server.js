const app = require('./app')

const http = require("http");

const port = 8000;

const server = http.createServer(app);

server.listen(port);