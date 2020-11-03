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


app.use(bodyParser());

//引入多个路由
const routing = require("./routes/api/index")
routing(app)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('app start', port)
})