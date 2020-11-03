class Common {
  test(ctx) {
    ctx.status = 200;
    ctx.body = {
      msg: "hellow test ge"
    }
  }
}


module.exports = new Common();