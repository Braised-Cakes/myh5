const router = require('../app.js')
const dbHandel = require('../db/handel.js')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')
const utils = require('../utils')
const sceneModel = require('../models/list')

/**
 * 列表页， 获取
 */

router.get('/aj/scene/list', async (req, res) => {
    /**
     * page,limit,uid,status
     * 默认情况获取所有非回收站作品
     */

    const status = {
        $in: req.query.status ? req.query.status.split(',') : [0, 1, 2]
    }
    const search = {
        uid: req.session.uid,
        status: status
    }
    const pageInfo = {
        page: Number(req.query.page) || DEFAULT_PAGE.page,
        limit: Number(req.query.limit) || DEFAULT_PAGE.limit
    }

    Promise.all([
        sceneModel.getSceneCount(search),
        sceneModel.getSceneList(search, pageInfo)
    ]).then(([total, data]) => {
        data.forEach((item) => {
            item.portrait = item.domain + item.portrait
        })

        res.send({
            status: AJ_STATUS.success,
            message: AJ_MESSAGE.success,
            result: {
                info: {
                    page: pageInfo.page,
                    limit: pageInfo.limit,
                    total: total,
                },
                data: data
            }
        })
    })
})

/**
 * 列表页， 添加
 */

router.post('/aj/scene/add', async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const title = req.body.title
    const desc = req.body.desc
    const uid = req.session.uid

    try {
        if (!title.length) {
            throw new Error('title不能为空')
        }
    } catch (e) {
        res.send({
            status: AJ_STATUS.error,
            message: e.message
        })
        return
    }

    const count = await collection.count()

    let copyItem = {}
    if (req.body.id) {
        copyItem = await collection.findOne({
            id: req.body.id
        })
    }

    let post = {
        id: count + 1,
        title: title,
        desc: desc,
        uid: uid,
        portrait: copyItem.portrait,
        data: copyItem.data,
        createTime: utils.getTime(),
        updateTime: utils.getTime()
    }

    sceneModel.addScene(post).then(() => {
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

router.get('/aj/scene/del', (req, res, next) => {
    const id = req.query.id
    sceneModel.getSceneById(id).then((data) => {
        if (!data) {
            res.send({
                status: AJ_STATUS.error,
                message: '该场景不存在'
            })
        } else {
            sceneModel.delScene(id).then(() => {
                res.send({
                    status: AJ_STATUS.success,
                    message: '删除成功',
                    result: {}
                })
            })
        }
    }).catch(next)
})

/**
 * 发布
 */

router.post('/aj/scene/publish', async (req, res, next) => {
    const id = req.body.id
    sceneModel.getSceneById(id).then((data) => {
        if (!data) {
            res.send({
                status: AJ_STATUS.error,
                message: '该场景不存在'
            })
        } else {
            sceneModel.updateScene(id, {
                updateTime: utils.getTime(),
                status: 1,
                publishData: data.data
            }).then(() => {
                res.send({
                    status: AJ_STATUS.success,
                    message: '发布成功'
                })
            })
        }
    }).catch(next)
})
