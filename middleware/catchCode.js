const format = (ctx, err) => {
  const { code, msg, data } = err;
  ctx.response.body = {
    code, msg
  }
};
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('----进入报错信息显示--')
    console.log(err)
    console.log('-----error--------')
    format(ctx, err)
  }
}