const { SUCCESS, NOT_FOUND_ERROR } = require("../utils/status-code");
const { saveSalt, getSalt } = require("../utils/crypt");
const { SECRET } = require("../config");
// 引入user模型
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
class User {
  async testPost(ctx) {
    const { account, password } = ctx.request.body;
    console.log('test success')
  }
  async register(ctx) {
    const { account, password } =JSON.parse(ctx.request.body) || {};
    console.log(account, password, '--------account, password---------');
    const result = await UserModel.findOne({ account });
    console.log(result);
    if (result) {
      await NOT_FOUND_ERROR(ctx, {}, "用户名已注册");
    }
    const hash = saveSalt(password);
    const newUser = new UserModel({
      account,
      password: hash,
      role: 'user',
    });
    await newUser.save().then(async (user) => {
      await SUCCESS(ctx, {}, "注册成功");
    });
  }
  async login(ctx) {
    const { account, password } = JSON.parse(ctx.request.body) || {};
    console.log(ctx.request.body, '--------result----------')
    const result = await UserModel.findOne({ account });
    if (!result) {
      await NOT_FOUND_ERROR(ctx, {}, "账号未注册");
    }
    const checkPassword = getSalt(password, result.password);
    if (!checkPassword) {
      await NOT_FOUND_ERROR(ctx, {}, "密码错误");
    } else {
      console.log('---------', SECRET)
      const token = jwt.sign(
        {
          name: result.account,
          _id: result._id,
        },
        SECRET,
        { expiresIn: "1h" }
      );
      await SUCCESS(ctx, {
        msg: "登录成功",
        data: { id: result.id, token, account, role: result.role },
      });
    }
  }
}

module.exports = new User();
