class StatusCode {
  constructor(data,msg,httpCode) {
    this.httpCode = httpCode;
    this.msg = msg;
    this.data = data
  }
  success(ctx) {
    ctx.body = {
      code: 200,
      msg: this.msg,
      ...this.data
    }
  }
  error(ctx) {
    ctx.throw(this.httpCode, this.msg, {
      code:this.httpCode,
      msg:this.msg,
    })
  }
}
class Success extends StatusCode {
  constructor(data,msg) {
    super(data,msg,200)
  }
}
class NotFound extends StatusCode {
  constructor(data,msg) {
    super(data,msg,404)
  }
}
class NotFoundToken extends StatusCode {
  constructor(data,msg,httpCode) {
    super(data,msg,httpCode)
  }
}
//成功
const SUCCESS = async (ctx, data,msg="请求成功") => new Success(data,msg).success(ctx);

//失败
const NOT_FOUND_ERROR = async (ctx, data={},msg="未找到相关资源") => new NotFound(data,msg).error(ctx);

// token失效
const NOT_FOUND_TOKEN = async (ctx) => new NotFoundToken('',msg="token失效,请重新登录",10001).error(ctx);
module.exports = {
  SUCCESS,
  NOT_FOUND_ERROR,
  NOT_FOUND_TOKEN
}