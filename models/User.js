const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化 

const UserSchema = new Schema({
  account: {
    type: String,
  },
  password: {
    type: String,
  },
  roles:{
    type:Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = UserModel = mongoose.model("users", UserSchema)
