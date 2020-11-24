const { SUCCESS, NOT_FOUND_ERROR } = require("../utils/status-code");
const { saveSalt, getSalt } = require("../utils/crypt");
// 引入user模型
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
class User {
  async register(ctx) {
    const { account, password } = ctx.request.body;
    const result = await UserModel.findOne({ account });
    console.log(result)
    if(result){
      await NOT_FOUND_ERROR(ctx, {}, "用户名已注册");
    }
    const hash = saveSalt(password);
    const newUser = new UserModel({ account, password: hash });
    await newUser.save().then(async (user) => {
      await SUCCESS(ctx, {}, "注册成功");
    });
  }
  async login(ctx) {
    const { account, password } = ctx.request.body;
    const result = await UserModel.findOne({ account });
    if (!result) {
      await NOT_FOUND_ERROR(ctx, {}, "账号未注册");
    }
    const checkPassword = getSalt(password, result.password);
    if (!checkPassword) {
      await NOT_FOUND_ERROR(ctx, {}, "密码错误");
    } else {
      const token = jwt.sign(
        {
          name: result.account,
          _id: result._id,
        },
        "admin-pc",
        { expiresIn: "5ms" }
      );
      await SUCCESS(ctx, { msg: "登录成功", data: { token, account } });
    }
  }
}

module.exports = new User();
