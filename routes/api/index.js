const express  = require("express");
const router = express.Router();
const userHelper = require("../../Helpers/userHelper");



// router.get('/test', async (req,res) => {
//   res.json("working");
//   console.log("request recieved");
// });

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
    req.session.userId = response.user.id;
    res.json(response);
  }).catch((response) => {
    res.json(response);
  })
});

router.get("/getuserdata", (req,res) => {
  const userId = req.session.userId;
  if (!userId) return res.json(false);
  userHelper.getUserData(userId).then((response) => {
    const user = response;
    res.json(user);
  });
});

router.get("/logout", (req,res) => {
  req.session.destroy();
  res.json();
});





module.exports = router;
