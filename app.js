const koa = require("koa");
const Router = require("koa-router");



//连接数据库
const mongoose = require("mongoose");
const db = require("./config")
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
const cors = require('koa2-cors');
const koaBody = require('koa-body')

// const catching=require("./middleware/catchCode")

// app.use(catching);
//引入中间件
app.use(koaBody({
  multipart: true,
  json: true
}));
app.use(cors());
// 引入自定义中间件
const middleware = require("./middleware")

middleware(app)
const routing = require("./routes/api/index")
routing(app)
console.log(process.env.PORT,'process.env.PORT')
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app start', port)
})