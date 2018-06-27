let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')
const utils = require('../utils')


/**
 * 列表页， 获取
 */
app.get('/aj/scene/list', async (req, res) => {
    /**
     * page,limit,uid,status
     * 默认情况获取所有非回收站作品
     */
    const collection = dbHandel.getModel('myh5')
    const page = Number(req.query.page) || DEFAULT_PAGE.page
    const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
    let status = req.query.status
    if (!status) {
        status = {
            $in: [0, 1, 2]
        }
    } else {
        status = Number(status)
    }
    const total = await collection.count({
        uid: req.session.uid,
        status: status
    })
    const data = await collection.find({
            uid: req.session.uid,
            status: status
        }, ['id', 'title', 'desc', 'status', 'createTime', 'domain', 'portrait'])
        .skip((page - 1) * limit)
        .sort({
            updateTime: -1
        })
        .limit(limit)
    data.forEach((item) => {
        item.portrait = item.domain + item.portrait
    })
    res.send({
        status: AJ_STATUS.success,
        message: AJ_MESSAGE.success,
        result: {
            info: {
                page: Number(req.query.page || DEFAULT_PAGE.page),
                total: total,
                limit: Number(req.query.limit || DEFAULT_PAGE.limit),
            },
            data: data
        }
    })
})

/**
 * 列表页， 添加
 */

app.post('/aj/scene/add', async (req, res) => {
    if (!req.body.title) {
        res.send({
            status: AJ_STATUS.error,
            message: '场景title为空'
        })
        return
    }
    const collection = dbHandel.getModel('myh5')
    const count = await collection.count()
    let copyItem = {}
    if (req.body.id) {
        copyItem = await collection.findOne({
            id: req.body.id
        })
    }
    new collection({
        id: count + 1,
        title: req.body.title,
        desc: req.body.desc,
        uid: req.session.uid,
        portrait: copyItem.portrait,
        data: (copyItem && copyItem.data) || {},
        createTime: utils.getTime(),
        updateTime: utils.getTime()
    }).save((err, docs) => {
        if (err) throw err
        res.send({
            status: AJ_STATUS.success,
            message: AJ_MESSAGE.success,
            result: {}
        })
    })
})

/**
 * 列表页， 删除
 */
app.get('/aj/scene/del', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const data = await collection.findOne({
        id: req.query.id
    })
    if (!data) {
        res.send({
            status: AJ_STATUS.error,
            message: 'id不存在',
            result: {}
        })
    } else {
        await collection.update({
            id: req.query.id
        }, {
            status: 3
        })
        res.send({
            status: AJ_STATUS.success,
            message: '删除成功',
            result: {}
        })
    }
})

/**
 * 发布
 */
app.post('/aj/scene/publish', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const scene = await collection.findOne({
        id: req.body.id
    })
    if (!scene) {
        res.send({
            status: AJ_STATUS.error,
            message: 'id不存在',
            result: {}
        })
    } else {
        await collection.update({
            id: req.body.id
        }, {
            updateTime: utils.getTime(),
            status: 1,
            publishData: scene.data
        })
        res.send({
            status: AJ_STATUS.success,
            message: '发布成功',
            result: {}
        })
    }
})
