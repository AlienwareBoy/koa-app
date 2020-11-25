const Router = require('koa-router');
const router = new Router();
const { test,info } = require("../../controller/common")

// 区分路由路径
router.prefix('/api/common');

/** 
 *  @roter  get api/user/test
 *  @desc 测试接口
*/
router.get('/test', test)

router.get('/info', info)
// router.get('/test', (ctx, next) => {
//   console.log('--------------')
//   console.log(ctx)
//   ctx.body = 'Hello World!';
// })


module.exports = router