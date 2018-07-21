let dbHandel = require('../db/handel.js')
let collection = dbHandel.getModel('user')

module.exports = {
  // 判断用户名和密码是否匹配
  goLogin(user, pass) {
    return collection.findOne({ username: user, password: pass })
  },

  // 判断用户名是否存在
  getUser(user) {
    return collection.findOne({ username: user })
  },

  //注册
  login({ user, pass, uid }) {
    return new collection({ username: user, password: pass, uid: uid }).save()
  }
}