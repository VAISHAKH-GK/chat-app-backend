const express  = require("express");
const router = express.Router();
const db = require("../../configs/mongodb");
const userHelper = require("../../Helpers/userHelper");



router.get('/test', async (req,res) => {
  await db.get().collection("hai").insertOne({"name":"testing"});
  console.log(req.session.user);
  req.session.user = {name:"vaishakh"}
  res.json("working");
  console.log("request recieved");
});

router.post("/signup", (req,res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  userHelper.doSignUp(userName,password).then((response) => {
    res.json(response);
  }).catch((response) => {
    res.json(response);
  });
});

router.post("/login", (req,res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  userHelper.doLogin(userName,password).then((response) => {
    req.session.user = response.user
    res.json(response);
  }).catch((response) => {
    res.json(response);
  })
});
















module.exports = router;
