const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const key = "admin-pc";
module.exports = async (ctx, next) => {
  console.log(ctx.header);
  const pass = ["/api/user/login", "/api/user/register"];
  if (pass.includes(ctx.url)) {
    console.log("不校验");
    next();
  } else {
   
    let token = ctx.request.headers["authorization"];
     let payload = await verify(token,key);
    let { time, timeout } = payload;
    let data = new Date().getTime();
    if (data - time <= timeout) {
        // 未过期
      await next();
    } else {
        //过期
      ctx.body = {
        status: 404,
        message:'token 已过期'
      };
    }
  }
  // return koaJwt({ secret: key }).unless({
  //   // path: [/^\(/api/user/login)/,/^\(/api/user/login)/],
  // });
};
