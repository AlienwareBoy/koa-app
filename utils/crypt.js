const crypt=require("bcryptjs")


const saveSalt=(password)=>{
  // 同步生成salt
  let salt=crypt.genSaltSync(5);
  let hash=crypt.hashSync(password,salt)
  return hash
}

const getSalt=(password,hash)=>{
   return crypt.compareSync(password,hash)
}

module.exports= {
  saveSalt,
  getSalt
}