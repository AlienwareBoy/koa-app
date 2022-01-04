const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const SECRET = "admin-pc";
const mongoUrl =
  "mongodb://localhost:27017/test";
module.exports = {
  config,
  mongoUrl,
  SECRET,
};
