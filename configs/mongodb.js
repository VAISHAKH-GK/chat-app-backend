const { MongoClient } = require("mongodb");

let state = {db:null};

module.exports.connect = (done) => {
  
  const uri = process.env.MONGODB_URI ;
  const dbname = process.env.DATABASE;

  const client = new MongoClient(uri);

  client.connect(function (err) {

    if (err) return done(err);
    state.db = client.db(dbname);
    console.log("Database created!");
    done();
  });

}

module.exports.get = () => {
  return state.db;
}
