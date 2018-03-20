let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')
app.get('/aj/list/get', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const page = Number(req.query.page) || DEFAULT_PAGE.page
    const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
    const total = await collection.count()
    const data = await collection.find({}, ['work_id'])
        .skip((page - 1) * limit)
        .limit(limit)
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


app.get('/aj/list/add', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const count = await collection.count()
    new collection({
        work_id: count + 1,
        username: '9999'
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
app.get('/aj/list/del', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const data = await collection.findOne({
        work_id: req.query.work_id
    })
    if (!data) {
        res.send({
            status: AJ_STATUS.error,
            message: 'work_id不存在',
            result: {}
        })
    } else {
        await collection.remove({
            work_id: req.query.work_id
        })
        res.send({
            status: AJ_STATUS.success,
            message: '删除成功',
            result: {}
        })
    }
})