const Router = require('koa-router');
const router = new Router();


// 区分路由路径
router.prefix('/api/common');

/** 
 *  @roter  get api/user/test
 *  @desc 测试接口
*/

router.get('/test', async ctx => {
  ctx.status = 200;
  ctx.body = {
    msg: "hellow test ge"
  }
})


module.exports= router