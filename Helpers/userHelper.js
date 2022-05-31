const signUpHelper = require("./signUpHelper");
const loginHelper = require("./loginHelper.js");
const db = require("../configs/mongodb");
const { ObjectId } = require("mongodb");

module.exports = {
  doSignUp: (userName,password) => {
    return new Promise( async (resolve,reject) => {
      const isUserNameUsed = await signUpHelper.isUserNameUsed(userName);
      if ( isUserNameUsed === true ) return reject({success:false,reason:"userName in Use"});
      const hashedPassword = await signUpHelper.hashPassword(password);
      const userId = await signUpHelper.storeUser({userName,password:hashedPassword});
      resolve({success:true});
    });
  },
  doLogin:(userName,password) => {
    return new Promise( async (resolve,reject) => {
      const user = await loginHelper.getUser(userName);
      if ( user == null ) return reject({success:false,reason:"No user with this UserName"});
      const match = await loginHelper.isPasswordCorrect({hashedPassword:user.password,password:password});
      if ( match ) resolve({success:true,user:{userName,id:user._id}});
      else reject({success:false,reason:"Wrong Password"});
    });
  },
  getUserData: (userId) => {
    return new Promise ( async (resolve,reject) => {
      const user = await db.get().collection("userData").findOne({_id:ObjectId(userId)},{projection:{userName:true,_id:false}});
      resolve({id:userId,userName:user.userName});
    });
  }
}
