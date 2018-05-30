let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')
const types = require('./types')
/**
 * 用户：注册
 */
app.post(types.userRegister, async (req, res) => {
    const collection = dbHandel.getModel('user')
    const data = await collection.findOne({
        username: req.body.username
    })
    //没有找到,可以注册
    if (!data) {
        const count = await collection.count()
        await new collection({
            username: req.body.username,
            password: req.body.password,
            uid: count + 1
        }).save()
        res.send({
            status: AJ_STATUS.success,
            message: '注册成功',
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
    if (!data) {
        res.send({
            status: AJ_STATUS.error,
            message: '用户名或密码不正确'
        })
    } else {
        res.clearCookie('username')
        req.session.isLogin = true
        req.session.username = req.body.username
        req.session.uid = data.uid
        res.cookie('username', req.body.username, {
            expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7)
        })
        res.send({
            status: AJ_STATUS.success,
            message: '登录成功'
        })
    }
})

/**
 * 登出
 */
app.post(types.userLogout, async (req, res) => {
    req.session.isLogin = null;
    req.session.uid = null;
    res.clearCookie('username')
    res.send({
        status: AJ_STATUS.success,
        message: '登出成功'
    })
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
