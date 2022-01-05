const { NOT_FOUND_ERROR, SUCCESS, NOT_FOUND_TOKEN } = require("../utils/status-code");
const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify); // 将jwt.verify函数promise化
const { SECRET } = require("../config");
const UserModel = require("../models/User");
const { exec } = require('child_process');
class Common {
  async test(ctx, next) {
    const { id } = ctx.query;
    id ? await SUCCESS(ctx, { token: 1231 }) : await NOT_FOUND_ERROR(ctx);
  }
  async info(ctx, next) {
    const token = ctx.header.authorization;
    console.log(token);
    if (token) {
      try {
        let payload = await verify(token.split(" ")[1], SECRET);
        const result = await UserModel.findOne({ account: payload.name });
        console.log("解密", result);
        await SUCCESS(ctx, { data: result });
      } catch (err) {
        await NOT_FOUND_TOKEN(ctx, "token失效，请重新登录");
        console.log("失效了");
        console.log(err);
      }
    }

    // if(token){

    //    if(token && decoded.exp <= new Date()/1000){
    //         return res.json({ success: false, message: 'token过期' });
    //     }else{
    //         // return next();
    //     }
    // }else{

    // }
  }
  async getWebHook(ctx, next) {
    exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行出错: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    console.log(ctx, '-------ctx')
    console.log(next, '----------next')
  }
}

module.exports = new Common();
