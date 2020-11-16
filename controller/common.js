const { NOT_FOUND_ERROR, SUCCESS } = require("../utils/status-code")

class Common {
  async test(ctx, next) {
    const { id } = ctx.query;
    id ? await SUCCESS(ctx, { token: 1231 }) : await NOT_FOUND_ERROR(ctx)
  }
}


module.exports = new Common(); 