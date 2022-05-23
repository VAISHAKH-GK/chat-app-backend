const express  = require("express");
const router = express.Router();
const db = require("../../configs/mongodb");



router.get('/test', async (req,res) => {
  await db.get().collection("hai").insertOne({"name":"testing"});
  res.json("working");
  console.log("request recieved");
});

















module.exports = router;
