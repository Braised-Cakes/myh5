let router = require('../app.js')
let utils = require('../utils')
let api = require('./types')
let sceneModel = require('../models/scene')
let {
  AJ_STATUS,
  AJ_MESSAGE
} = require('../const/index')

// 获取指定场景
router.get(api.getSceneData, async (req, res) => {
  try {
    let data = await sceneModel.getSceneById(id)
    if (!data) {
      throw new Error('场景不存在')
    } else {
      data.portrait = data.domain + data.portrait
      res.send({ status: AJ_STATUS.success, message: AJ_MESSAGE.success, result: data })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 保存场景
router.post(api.saveScene, async (req, res) => {
  let id = req.body.id
  try {
    let data = await sceneModel.getSceneById(id)
    if (!data) {
      throw new Error('场景不存在')
    } else {
      await sceneModel.updateSceneById(id, {
        data: req.body.data,
        updateTime: utils.getTime(),
        status: data.status != 0 ? 2 : 0
      })
      res.send({ status: AJ_STATUS.success, message: AJ_MESSAGE.success })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 更新场景信息
router.post(api.updateScene, async (req, res) => {
  let id = req.body.id
  try {
    let data = await sceneModel.getSceneById(id)
    if (!data) {
      throw new Error('场景不存在')
    } else {
      let title = req.body.title || data.title
      let desc = req.body.desc || data.desc
      let portrait = req.body.portrait || data.portrait
      portrait = portrait.match(/.com\/(.+)/)[1]
      await sceneModel.updateSceneById(id, {
        title: title,
        desc: desc,
        portrait: portrait
      })
      res.send({ status: AJ_STATUS.success, message: '更新成功' })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 获取场景列表
router.get('/aj/scene/list', async (req, res) => {
  // page,limit,uid,status
  let search = {
    uid: req.session.uid,
    status: {
      // 默认情况获取所有非回收站作品
      $in: req.query.status ? req.query.status.split(',') : [0, 1, 2]
    }
  }
  let page = Number(req.query.page) || 1
  let limit = Number(req.query.limit) || 10
  let [total, data] = await Promise.all([
    sceneModel.getSceneCount(search),
    sceneModel.getSceneList(search, { page, limit })
  ])
  data.forEach((item) => {
    item.portrait = item.domain + item.portrait
  })
  res.send({
    status: AJ_STATUS.success,
    message: AJ_MESSAGE.success,
    result: {
      info: {
        page: page,
        limit: limit,
        total: total,
      },
      data: data
    }
  })
})

// 添加一个场景
router.post('/aj/scene/add', async (req, res) => {
  let title = req.body.title
  let desc = req.body.desc
  let uid = req.session.uid

  try {
    if (!title.length) {
      throw new Error('title不能为空')
    }
    let count = await sceneModel.getSceneCount()
    let copyItem = {}
    if (req.body.id) {
      copyItem = await sceneModel.getSceneById(req.body.id)
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
    await sceneModel.addScene(post)
    res.send({ status: AJ_STATUS.success, message: AJ_MESSAGE.success })
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
    return
  }
})

// 删除一个场景
router.get('/aj/scene/del', async (req, res, next) => {
  let id = req.query.id
  try {
    let data = await sceneModel.getSceneById(id)
    if (!data) {
      throw new Error('该场景不存在')
    } else {
      await sceneModel.delSceneById(id)
      res.send({ status: AJ_STATUS.success, message: '删除成功' })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})

// 发布一个场景
router.post('/aj/scene/publish', async (req, res, next) => {
  let id = req.body.id
  try {
    let data = await sceneModel.getSceneById(id)
    if (!data) {
      throw new Error('该场景不存在')
    } else {
      await sceneModel.updateSceneById(id, {
        updateTime: utils.getTime(),
        status: 1,
        publishData: data.data
      })
      res.send({ status: AJ_STATUS.success, message: '发布成功' })
    }
  } catch (e) {
    res.send({ status: AJ_STATUS.error, message: e.message })
  }
})