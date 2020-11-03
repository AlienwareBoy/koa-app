const Router = require('koa-router');
const router = new Router();
const { register, login } = require("../../controller/user")


// 区分路由路径
router.prefix('/api/user');

// 引入user
const User = require("../../modules/User");
/** 
 *  @roter  POST api/user/Sign Up
 *  @desc 注册
*/
router.post('/register', register)
/** 
 *  @roter  POST api/user/Sign Up
 *  @desc 登录
*/
router.post('/login', login)

module.exports = router