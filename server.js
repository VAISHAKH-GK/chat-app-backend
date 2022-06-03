const express = require("express");
const db = require("./configs/mongodb");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/api/user");

const port = process.env.PORT ;
const fiveMinute = 1000 * 60 * 5;
const app = express();

app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(session({
  secret:process.env.SESSION_KEY,
  saveUninitialized:false,
  resave:true,
  cookie:{
    maxAge:fiveMinute
  }
}));

app.use(bodyParser.json());

db.connect((err) => {
  if ( err ) console.log(err);
  else console.log("connected");
});

app.use('/api/user',userRouter);

app.listen(port,() => {
  console.log("server started");
});

