const config={
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const mongoUrl="mongodb+srv://yu:yu123@cluster0.qprc4.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"
module.exports = {
  config,
  mongoUrl
}