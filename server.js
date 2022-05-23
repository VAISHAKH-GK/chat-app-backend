const express = require("express");
const db = require("./configs/mongodb");

const app = express();

db.connect((err) => {
  if ( err ) console.log(err);
  else console.log("connected");
});

const apiRouter = require("./routes/api/index.js");


const port = process.env.PORT ;


app.use('/api',apiRouter);




app.listen(port,() => {
  console.log("server started");
});

