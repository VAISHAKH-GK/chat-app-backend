const bcrypt = require("bcrypt");
const db = require("../configs/mongodb");


module.exports = {
  getUser: async ( userName ) => {
    const user = await db.get().collection("userData").findOne({userName});
    return user;
  },
  isPasswordCorrect:({hashedPassword,password}) => {
    return new Promise ( async (resolve,reject) => {
      const match = await bcrypt.compare(password,hashedPassword);
      resolve(match);
    });
  }
}
