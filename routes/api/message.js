const express = require("express");
const io = require("../../configs/socketIo");

const router = express.Router();

router.get("/sample", (req, res) => {
  console.log("server messages route");
  res.json();
});

let sockets = 0;

io.on("connect", (socket => {
  sockets++;
  console.log("socket connected");
  console.log("total connected sockets is " + sockets);
  socket.on("message", (message) => {
    console.log("message recevied");
    console.log(message);
  });
  socket.on("disconnect", (io) => {
    sockets--;
    console.log("socket disconnected");
    console.log("total connected sockets is " + sockets);
  });
}));

module.exports = router;
