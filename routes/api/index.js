const express  = require("express");
const router = express.Router();



router.get('/test',(req,res) => {
  res.json("working");
  console.log("request recieved");
})

















module.exports = router;
