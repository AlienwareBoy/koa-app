class StatusCode {
  constructor(data, httpCode, errMsg) {
    this.httpCode = httpCode;
    this.errMsg = errMsg;
    this.data = data
  }
  success(ctx) {
    ctx.body = {
      code: 200,
      msg: this.errMsg,
      data: this.data
    }
  }
  error(ctx) {
    console.log('---------2--------')
    ctx.throw(this.httpCode, this.errMsg, this.data)
  }
}
class Success extends StatusCode {
  constructor(errMsg = '请求成功', data, httpCode = 200) {
    super(data, httpCode, errMsg)
  }
}
class NotFound extends StatusCode {
  constructor(httpCode = 200, data, errMsg) {
    super(data, httpCode, errMsg)
  }
}

//成功
const SUCCESS = async (ctx, { msg, data }) => new Success(msg, data).success(ctx);

//失败
const NOT_FOUND_ERROR = async (ctx, { msg = '缺少参数', code = 404 }) => new NotFound(404, '缺少参数', { msg, code }).error(ctx);

module.exports = {
  SUCCESS,
  NOT_FOUND_ERROR
}