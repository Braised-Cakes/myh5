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
app.get('/aj/list/get', async (req, res) => {
  const collection = dbHandel.getModel('myh5')
  const page = Number(req.query.page) || DEFAULT_PAGE.page
  const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
  const total = await collection.count({
    uid: req.session.uid
  })
  const data = await collection.find({
      uid: req.session.uid,
      show: true
    }, ['id', 'title', 'desc'])
    .skip((page - 1) * limit)
    .sort({
      createTime: -1
    })
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

/**
 * 列表页， 添加
 */

app.post('/aj/list/add', async (req, res) => {
  if (!req.body.title) {
    res.send({
      a: 1
    })
    return;
  }
  const collection = dbHandel.getModel('myh5')
  const count = await collection.count()
  console.log(count);
  new collection({
    id: count + 1,
    title: req.body.title,
    desc: req.body.desc,
    uid: req.session.uid,
    createTime: new Date().getTime()
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
      show: false
    })
    res.send({
      status: AJ_STATUS.success,
      message: '删除成功',
      result: {}
    })
  }
})
