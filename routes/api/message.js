const express = require("express");
const io = require("../../configs/socketIo");
const db = require("../../configs/mongodb");
const { ObjectId } = require("mongodb");

const router = express.Router();

function addMessage(dm, message) {
  return new Promise(async (resolve, reject) => {
    let dmMessage = await db.get().collection("dmMessages").findOne({ dm });
    if (dmMessage) {
      db.get().collection("dmMessages").updateOne({ dm }, { $push: { messages: message } });
      return resolve({ success: true });
    }
    db.get().collection("dmMessages").insertOne({ dm, messages: [message] });
    resolve(true);
  });
}

const createDm = (user1, user2) => {
  return new Promise((resolve, reject) => {
    db.get().collection("dms").insertOne({ user1, user2 }).then(response => {
      resolve(response.insertedId);
    });
  });
}

const findDm = (user1, user2) => {
  return new Promise(async (resolve, reject) => {
    console.log(user1);
    console.log(user2);
    const response = await db.get().collection("dms").findOne({ user1, user2 });
    console.log(response);
    resolve(response);
  });
}

const getDm = (user1, user2) => {
  return new Promise(async (resolve, reject) => {
    Promise.all([findDm(user1, user2), findDm(user2, user1)]).then(([response1, response2]) => {
      let response = false;
      if (response1) {
        response = response1;
      } else if (response2) {
        response = response2;
      }
      console.log("dm");
      console.log(response);
      let dm = response;
      if (dm) {
        resolve(dm);
      } else {
        createDm(user1, user2).then((response) => {
          dm = response;
          resolve(dm);
        });
      }
    })
  });
}

const getMessages = (dm) => {
  return new Promise(async (resolve, reject) => {
    const response = await db.get().collection("dmMessages").findOne({ dm }, { projection: { _id: false, messages: true } });
    const messages = response?.messages;
    resolve(messages);
  });
}

router.get("/getmessages", async (req, res) => {
  if (!req?.session?.userId) {
    res.json(false);
  } else {
    const user = req.session.userId;
    const dmUser = req.query.dmuser;
    const dm = await getDm(user, dmUser);
    const messages = await getMessages(dm) || [];
    res.json(messages);
  }
});

let sockets = 0;
let connectedUsers = {};

const addMessageToServer = (message) => {
  return new Promise(async (resolve, reject) => {
    const dm = await getDm(message.from._id, message.to._id);
    addMessage(dm, message);
    resolve(true);
  });
}

io.on("connect", (socket => {
  sockets++;
  console.log(socket.handshake.headers.cookie);
  console.log("socket connected");
  console.log("total connected sockets is " + sockets);
  socket.on("message", (message) => {
    console.log("new message");
    console.log(`message${message.to_id}`);
    addMessageToServer(message);
    socket.broadcast.emit(`message${message.to._id}`, message);
  });
  socket.on("disconnect", (io) => {
    sockets--;
    console.log("socket disconnected");
    console.log("total connected sockets is " + sockets);
  });
}));

module.exports = router;
