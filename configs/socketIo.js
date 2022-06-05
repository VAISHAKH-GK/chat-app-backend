const express = require('express');
const {createServer} = require("http");

var app = express();

const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin:["http://localhost:3000"]    
  }
});


module.exports = io

