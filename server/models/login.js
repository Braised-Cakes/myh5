const dbHandel = require('../db/handel.js')
const collection = dbHandel.getModel('user')

module.exports = {
  // 登陆
  goLogin(user, pass) {
    return collection.findOne({ username: user, password: pass })
  },


  // 判断用户是否存在
  getUser(user) {
    return collection.findOne({ username: user })
  },

  //注册
  login({ user, pass, uid }) {
    return new collection({ username: user, password: pass, uid: uid }).save()
  }
}