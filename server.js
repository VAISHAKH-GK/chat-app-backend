const express = require("express");
const db = require("./configs/mongodb");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());

const oneMinute = 1000 * 60;

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true,
  cookie:{
    originalMaxAge:oneMinute
  }
}));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(session({secret:process.env.SESSION_KEY,saveUninitialized:false,resave:true}));

app.use(bodyParser.json());

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

