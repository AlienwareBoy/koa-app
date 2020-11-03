const Router = require('koa-router');
const { findById } = require('../../modules/User');
const router = new Router();
const { test } = require("../../controller/common")

// 区分路由路径
router.prefix('/api/common');

/** 
 *  @roter  get api/user/test
 *  @desc 测试接口
*/
router.get('/test', test)


module.exports = router