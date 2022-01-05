const Router = require('koa-router');
const router = new Router();
const { test, info,getWebHook } = require("../../controller/common")

// 区分路由路径
router.prefix('/api/common');

/** 
 *  @roter  get api/user/test
 *  @desc 测试接口
*/
router.post('/getWebHook', getWebHook)
router.get('/info', info)
router.get('/test', (ctx, next) => {
  console.log('我进来了')
    let html = `
    <ul>
      <li><a href="/api/user/login">登录</a></li>
      <li><a href="/api/user/register">注册</a></li>
      <li><a href="/api/user/upload">发布</a></li>
    </ul>
  `
    ctx.body = html
})


module.exports = router