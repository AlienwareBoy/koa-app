const { NOT_FOUND_ERROR, SUCCESS } = require("../utils/status-code");
const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify); // 将jwt.verify函数promise化
const { SECRET } = require("../config");
class Common {
  async test(ctx, next) {
    const { id } = ctx.query;
    id ? await SUCCESS(ctx, { token: 1231 }) : await NOT_FOUND_ERROR(ctx);
  }
  async info(ctx, next) {
    const token = ctx.header.authorization;
    console.log('用户',token)
    if(token){
       let decoded = jwt.decode(token, SECRET);
       if(token && decoded.exp <= new Date()/1000){
            return res.json({ success: false, message: 'token过期' });
        }else{
            // return next();
        }
    }else{

    }
    // try {
    //   const payload = await verify(token.split(" ")[1], SECRET);
    //   console.log('用户信息',payload)
    //   await SUCCESS(ctx, { userInfo: payload });
    // } catch (err) {
    //   console.error(err);
    //   ctx.body = {
    //     errno: -1,
    //     msg: "Verify token failed.",
    //   };
    // }
  }
}

module.exports = new Common();
