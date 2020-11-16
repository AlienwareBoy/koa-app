const { SUCCESS, NOT_FOUND_ERROR } = require("../utils/status-code")
// 引入user模型
const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');

class User {
  async register(ctx) {
    const { account, password } = ctx.request.body;
    const result = await UserModel.find({ account });
    if (result.length > 0) {
      await NOT_FOUND_ERROR(ctx, { msg: '用户已注册', code: 404 })
    } else {
      const newUser = new UserModel({ account, password });
      await newUser.save().then(async user => {
        await SUCCESS(ctx)
      })
    }
  }
  async login(ctx) {
    const { account, password } = ctx.request.body;
    const result = await UserModel.findOne({ account });
    console.log(result)
    if (!result) {
      await NOT_FOUND_ERROR(ctx, { msg: '用户未注册' })
    } else {
      const token = jwt.sign({
        name: result.account,
        _id: result._id
      }, 'admin-pc', { expiresIn: '2h' });
      await await SUCCESS(ctx, { msg: '登录成功',data:{token}})
    }
  }
}

module.exports = new User();