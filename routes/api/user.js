const Router = require('koa-router');
const router = new Router();

const jwt = require('jsonwebtoken');

// 引入user
const User = require("../../modules/User");
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

/** 
 *  @roter  POST api/user/Sign Up
 *  @desc 注册
*/
router.post('/register', async ctx => {
  const { name, password } = ctx.request.body;
  const result = await User.find({ name });
  if (result.length > 0) {
    ctx.status = 200;
    ctx.body = '名字已经被占用'
    console.log("被占用")
  } else {
    const newUser = new User({ name, password });
    await newUser.save().then(user => {
      ctx.body = {
        msg: '注册成功',
        result: user
      };
      console.log("注册成功")
    }).catch(err => {
      // console.log(err)
    })
    ctx.body = newUser
  }
})

/** 
 *  @roter  POST api/user/Sign Up
 *  @desc 登录
*/
router.post('/login', async ctx => {
  const { account, password } = ctx.request.body;
  const result = await User.findOne({ account });
  if (!result) {
    ctx.body= {
      status: 304,
      msg: '未注册，请注册后重试'
    }
  }
  else if (account.length > 0) {
    ctx.body= {
      state: 304,
      body: '账号被使用,请重试'
    }
  } else {
    const newUser = new User({ name, password });
    await newUser.save().then(user => {
      ctx.body = {
        msg: '注册成功',
        result: user
      };
      console.log("注册成功")
    }).catch(err => {
      // console.log(err)
    })
    ctx.body = newUser
  }
})

module.exports = router.routes();