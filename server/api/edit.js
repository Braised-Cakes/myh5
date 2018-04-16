let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const fs = require('fs')
let path = require('path')
let glob = require('glob')
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

/**
 * 获取形状的接口
 */
app.get('/aj/shape/get', async (req, res) => {
  const collection = dbHandel.getModel('shape')
  const page = Number(req.query.page) || DEFAULT_PAGE.page
  const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
  const total = await collection.count()
  const data = await collection.find({}, ['id', 'path'])
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
/**
 * 获取某个svg的content? js是否可以根据svg url拿到content?
 */
app.get('/aj/shape/getContent', async (req, res) => {
  const collection = dbHandel.getModel('shape')
  const data = await collection.findOne({
    id: req.query.id
  })
  let docs = fs.readFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg/${data.path}`, 'utf-8');
  res.send({
    status: AJ_STATUS.success,
    message: AJ_MESSAGE.success,
    result: docs
  })
})




/**
 * 获取形状的接口
 */
app.get('/aj/music/get', async (req, res) => {
  const collection = dbHandel.getModel('music')
  const page = Number(req.query.page) || DEFAULT_PAGE.page
  const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
  const total = await collection.count()
  const data = await collection.find({})
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















/**
 * 列表页， 添加
 */
// app.get('/aj/shape/del', async (req, res) => {
//     const collection = dbHandel.getModel('shape')
//     await collection.remove({});
//     res.send({
//         status: AJ_STATUS.success,
//         message: AJ_MESSAGE.success,
//         result: '成功'
//     })
// });
// app.get('/aj/shape/add', async (req, res) => {
//     const collection = dbHandel.getModel('shape')
//     const count = await collection.count()
//     let docs = glob.sync('/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*/*.json')
//     let index = 400000000
//     for (let i = 0; i < docs.length; i++) {
//         let file = JSON.parse(fs.readFileSync(docs[i], 'utf-8'));
//         for (let j = 0; j < file.length; j++) {
//             new collection({
//                 path: path.basename(file[j].path),
//                 id: index++
//             }).save((err, docs) => {

//             })
//         }
//     }
//     res.send({
//         status: AJ_STATUS.success,
//         message: AJ_MESSAGE.success,
//         result: {}
//     })
// })



/**
 * typeId 400 +
 * tagId  4000 + 
 */
// app.get('/aj/shape/nav/get', async (req, res) => {
//     const collection = dbHandel.getModel('shape')
//     let docs = glob.sync('/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*/*.json')
//     // console.log(docs)
//     let typeId;
//     let tagId = 40000;
//     for (let i = 0; i < docs.length; i++) {
//         let file = JSON.parse(fs.readFileSync(docs[i], 'utf-8'));
//         switch (path.basename(path.dirname(docs[i]))) {
//             case '图形':
//                 typeId = 400;
//                 break;
//             case '图标':
//                 typeId = 401;
//                 break;
//             case '文字':
//                 typeId = 402;
//                 break;
//         }
//         tagId++;
//         for (let j = 0; j < file.length; j++) {
//             await collection.update({
//                 path: file[j].path
//             }, {
//                 typeId: typeId,
//                 tagId: tagId
//             })
//         }
//     }
//     let data = await collection.find();
//     console.log(data)


//     res.send({
//         status: AJ_STATUS.success,
//         message: AJ_MESSAGE.success,
//         result: 111
//     })
// })



// app.get('/aj/shape/nav/set', async (req, res) => {
//     const collection = dbHandel.getModel('desc')
//     let docs = glob.sync('/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*')
//     let docs2 = glob.sync('/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*/*.json')
//     const {
//         shape = {}
//     } = await collection.findOne({
//         id : 1
//     })
//     shape.typeId = shape.typeId || [];
//     let typeId;
//     if (shape.typeId.length > 0) {
//         typeId = shape.typeId[shape.typeId.length - 1].id + 1
//     } else {
//         typeId = 400
//     }
//     for (let i = 0; i < docs.length; i++) {
//         let btn = shape.typeId.some((item)=>{
//             return item.name == path.basename(docs[i])
//         })
//         if(btn){
//             continue;
//         }
//         shape.typeId.push({
//             id: typeId,
//             name: path.basename(docs[i])
//         })
//         typeId++;
//     }
//     await collection.update({
//         id: 1
//     }, {
//         shape: shape
//     })
//     console.log(shape)
//     res.send({
//         status: AJ_STATUS.success,
//         message: AJ_MESSAGE.success,
//         result: 111
//     })
// })
