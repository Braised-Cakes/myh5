const app = require('../app.js')
const dbHandel = require('../db/handel.js')
const utils = require('../utils')
const api = require('./types')
const {
    DEFAULT_PAGE,
    AJ_STATUS,
    AJ_MESSAGE
} = require('../const/index')

/**
 * 判断场景是否存在
 * @param  {String|Number}  id 
 * @return {Boolean|Object} false或者场景内容
 */
async function existScene(id) {
    const collection = dbHandel.getModel('myh5')
    id = Number(id)
    if (isNaN(id)) {
        return false
    }
    const data = await collection.findOne({
        id: id
    })
    return data
}

/**
 * 获取某个场景
 */
app.get(api.getSceneData, async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const sceneData = await existScene(req.query.id)
    if (sceneData) {
        sceneData.portrait = sceneData.domain + sceneData.portrait
        res.send({
            status: AJ_STATUS.success,
            message: AJ_MESSAGE.success,
            result: {
                data: sceneData
            }
        })
    } else {
        res.send({
            status: AJ_STATUS.error,
            message: '场景不存在'
        })
    }
})

/**
 * 获取发布后的数据
 */
app.get(api.getPublishScene, async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const sceneData = await existScene(req.query.id)
    if (sceneData) {
        res.send({
            status: AJ_STATUS.success,
            message: AJ_MESSAGE.success,
            result: {
                data: sceneData
            }
        })
    } else {
        res.send({
            status: AJ_STATUS.error,
            message: '场景不存在'
        })
    }

})

/**
 * 保存场景
 */
app.post(api.saveScene, async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const sceneData = await existScene(req.body.id)
    if (sceneData) {
        //如果还是未发布状态， 修改数据，发布状态还是0 ， 如果是已发布状态， 就改成已修改
        await collection.update({
            id: req.body.id
        }, {
            data: req.body.data,
            updateTime: utils.getTime(),
            status: sceneData.status != 0 ? 2 : 0
        })
        res.send({
            status: AJ_STATUS.success,
            message: AJ_MESSAGE.success
        })
    } else {
        res.send({
            status: AJ_STATUS.error,
            message: '场景不存在'
        })
    }

})

/**
 * 更新场景信息
 */
app.post(api.updateScene, async (req, res) => {
    const collection = dbHandel.getModel('myh5')
    const sceneData = await existScene(req.body.id)
    if (sceneData) {
        let title = req.body.title || sceneData.title
        let desc = req.body.desc || sceneData.desc
        let portrait = req.body.portrait || sceneData.portrait
        portrait = portrait.match(/.com\/(.+)/)[1]
        await collection.update({
            id: req.body.id
        }, {
            title: title,
            desc: desc,
            portrait: portrait
        })
        res.send({
            status: AJ_STATUS.success,
            message: '更新成功',
            result: {}
        })
    } else {
        res.send({
            status: AJ_STATUS.error,
            message: '场景不存在'
        })
    }
})
