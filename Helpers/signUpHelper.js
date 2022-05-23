const bcrypt = require("bcrypt");
const { response } = require("express");
const db = require("../configs/mongodb");

module.exports = {
  hashPassword: (password) => {
    return new Promise ( async (resolve,reject) => {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      resolve(hash);
    });
  },
  isUserNameUsed:async (userName) => {
    const user = await db.get().collection("userData").findOne({userName});
    if ( user ) return true;
    else return false;
  },
  storeUser: (user) => {
    return new Promise ( async (resolve,reject) => {
      const response = await db.get().collection("userData").insertOne(user);
      resolve(response.insertedId);
    });
  }
}
