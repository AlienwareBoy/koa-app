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
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model("users", UserSchema)
