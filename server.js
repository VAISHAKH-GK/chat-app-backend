const express = require("express");
const app = express();

const apiRouter = require("./routes/api/index.js");


const port = process.env.PORT || '9000';

app.use('/api',apiRouter);






app.listen(port,() => {
  console.log("server started");
});

