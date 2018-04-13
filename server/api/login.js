let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
  DEFAULT_PAGE,
  AJ_STATUS,
  AJ_MESSAGE
} = require('../const/index')
const types = require('./types')
/**
 * 用户：注册f
 */
app.post(types.userRegister, async (req, res) => {
  const collection = dbHandel.getModel('user')
  const data = await collection.findOne({
    username: req.body.username
  })
  //没有找到,可以注册
  if (!data) {
    await new collection({
      username: req.body.username,
      password: req.body.password
    }).save()
    res.send({
      status: AJ_STATUS.success,
      message: AJ_MESSAGE.success,
      result: {
        data: data
      }
    })
  } else {
    res.send({
      status: AJ_STATUS.error,
      message: '用户已经存在',
      result: {
        data: data
      }
    })
  }
})


/**
 * 用户：登录
 */
app.post(types.userLogin, async (req, res) => {
  const collection = dbHandel.getModel('user')
  const data = await collection.findOne({
    username: req.body.username,
    password: req.body.password
  })
  //
  if (!data) {
    res.send({
      status: AJ_STATUS.error,
      message: '用户名不存在',
      result: {
        data: data
      }
    })
  } else {
    res.clearCookie('username')
    req.session.isLogin = true
    req.session.username = req.body.username
    res.cookie('username', req.body.username, {
      expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7)
    })
    res.send({
      status: AJ_STATUS.success,
      message: '登录成功',
      result: {}
    })
  }
})


/**
 * 获取用户信息
 */
app.get(types.getUserInfo, async (req, res) => {
  if (req.session.isLogin) {
    res.send({
      status: AJ_STATUS.success,
      message: '获取成功',
      result: req.session.username
    })
  } else {
    res.send({
      status: AJ_STATUS.error,
      message: '没有拿到用户信息'
    })
  }

})
