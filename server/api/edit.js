let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')


/**
 * 列表页， 获取
 */
app.get('/aj/edit/get', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const data = await collection.findOne({
        id: req.query.id
    })
    res.send({
        status: AJ_STATUS.success,
        message: AJ_MESSAGE.success,
        result: {
            data: data
        }
    })
})

/**
 * 列表页， 保存
 */
app.post('/aj/edit/save', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    await collection.update({
        id: req.body.id
    }, {
        data: req.body.data
    })
    
    res.send({
        status: AJ_STATUS.success,
        message: AJ_MESSAGE.success,
        result: {}
    })
})
