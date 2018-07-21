let uuid = require('uuid/v1')
let router = require('../app.js')
let userModel = require('../models/login')
let { AJ_STATUS, AJ_MESSAGE } = require('../const/index')
let types = require('./types')

// 用户注册
router.post(types.userRegister, async (req, res) => {
  let user = req.body.username
  let pass = req.body.password
  try {
    let data = await userModel.getUser(req.body.username)
    if (!data) {
      await userModel.login({ user: user, pass: pass, uid: uuid() })
      res.send({ status: AJ_STATUS.success, message: '注册成功' })
    } else {
      throw new Error('用户已经存在')
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 用户登陆
router.post(types.userLogin, async (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  try {
    let data = await userModel.goLogin(user, pass)
    if (!data) {
      throw new Error('用户名或密码不正确')
    } else {
      req.session.isLogin = true
      req.session.username = req.body.username
      req.session.uid = data.uid
      res.cookie('username', req.body.username, {
        expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7)
      })
      res.send({ status: AJ_STATUS.success, message: '登录成功' })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 注销
router.post(types.userLogout, (req, res) => {
  req.session.isLogin = null
  req.session.uid = null
  req.session.username = null
  res.clearCookie('username')
  res.send({ status: AJ_STATUS.success, message: '注销成功' })
})

// 获取用户信息
router.get(types.getUserInfo, async (req, res) => {
  try {
    if (req.session.isLogin) {
      let data = await userModel.getUser(req.session.uid)
      res.send({ status: AJ_STATUS.success, message: '获取成功', result: data })
    } else {
      throw new Error('没有拿到用户信息')
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})