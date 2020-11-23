const { SUCCESS, NOT_FOUND_ERROR } = require("../utils/status-code")
const crypto = require('crypto');
// 引入user模型
const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');

class User {
  async register(ctx) {
    const { account, password } = ctx.request.body;
    const result = await UserModel.find({ account });
    if (result.length > 0) {
      await NOT_FOUND_ERROR(ctx)
    } else {
      const newUser = new UserModel({ account, password });
      await newUser.save().then(async user => {
        await SUCCESS(ctx,{},'注册成功')
      })
    }
  }
  async login(ctx) {
    const { account, password } = ctx.request.body;
    // const result=await UserModel.findOne({
    // account:account,
    // password:crypto.createHash('md5').update(password).digest('hex')});
    const result =await UserModel.find({account,password})
    console.log(result)
    if (result.length===0) {
      await NOT_FOUND_ERROR(ctx,{},'账号未注册')
    } else {
      const token = jwt.sign({
        name: result.account,
        _id: result._id
      }, 'admin-pc', { expiresIn: '2h' });
      await await SUCCESS(ctx, { msg: '登录成功',data:{token,account}})
    }
  }
}

module.exports = new User();