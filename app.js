const koa = require("koa");
const Router = require("koa-router");



//连接数据库
const mongoose = require("mongoose");
const db = require("./config/index")
mongoose.connect(
  db.mongoUrl,
  db.config,
).then((res) => {
  console.log('mongoose is success')
}).catch(err => {
  console.log('------------mongoose is error')
  console.log(err)
})


const app = new koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');

// const catching=require("./middleware/catchCode")

// app.use(catching);
//引入中间件
app.use(bodyParser());

// 引入自定义中间件
const middleware = require("./middleware")

middleware(app)
//引入多个路由
const routing = require("./routes/api/index")
routing(app)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('app start', port)
})