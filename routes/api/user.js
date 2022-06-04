const express = require("express");
const router = express.Router();
const userHelper = require("../../Helpers/userHelper");

router.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  userHelper.doSignUp(userName, password).then((response) => {
    res.json(response);
  }).catch((response) => {
    res.json(response);
  });
});

router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  userHelper.doLogin(userName, password).then((response) => {
    req.session.userId = response.user._id; req.session.isLoggedIn = true;
    res.json(response);
  }).catch((response) => {
    res.json(response);
  })
});

router.get("/getuserdata", (req, res) => {
  const userId = req.session.userId;
  console.log("user")
  console.log(userId);
  if (!userId) return res.json(false);
  userHelper.getUserData(userId).then((response) => {
    const user = response;
    console.log("user")
    console.log(response);
    res.json(user);
  });
});

router.get("/logout", (req, res) => {
  req.session.userId = null;
  req.session.isLoggedIn = false;
  res.json();
});

router.get("/isloggedin", (req, res) => {
  console.log("is logged in")
  console.log(req.session.isLoggedIn);
  const isLoggedIn = req.session.isLoggedIn ?? false;
  res.json(isLoggedIn);
});

router.get("/getusers", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.json(false);
  }
  userHelper.getUsers(userId).then((users) => {
    console.log(users);
    res.json(users);
  });
});





module.exports = router;
