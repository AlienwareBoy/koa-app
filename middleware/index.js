const fs= require("fs");

module.exports=(app)=>{
  fs.readdirSync(__dirname).forEach(middleware=>{
    if (middleware === 'index.js') return
    const middlewares = require(`./${middleware}`);
    app.use(middlewares)
  })
}