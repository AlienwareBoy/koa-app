module.exports = async (ctx, next) => {
    console.log(ctx.request.body,'传递信息')
    console.log(typeof ctx.request.body,'typeof ctx.request.body')
    if (typeof ctx.request.body === 'string') {
        ctx.request.body = JSON.parse(ctx.request.body)
    }
    await next()
}