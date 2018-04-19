let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const fs = require('fs')
let path = require('path')
let glob = require('glob')
const userId = 999;
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
 * 获取形状的导航信息
 */
app.get('/aj/shape/nav', async (req, res) => {
  const collection = dbHandel.getModel('desc')
  let {
    shape
  } = await collection.findOne();
  res.send({
    status: AJ_STATUS.success,
    message: AJ_MESSAGE.success,
    result: shape
  })
})


/**
 * 获取形状
 * @param {page}
 * @param {limit}
 * @param {typeId}
 * @param {tagId}
 */
app.get('/aj/shape/get', async (req, res) => {
  const collection = dbHandel.getModel('shape')
  const usedCollection = dbHandel.getModel('used_shapes')
  const page = Number(req.query.page) || DEFAULT_PAGE.page
  const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
  let find = {}
  req.query.typeId && (find.typeId = new RegExp(req.query.typeId))
  req.query.tagId && (find.tagId = new RegExp(req.query.tagId))
  let total, data;
  if (req.query.used) {
    let total = await usedCollection.count({
      uid: userId
    })
    let ddd = await usedCollection.find({
        uid: userId
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        usedTime: -1
      })
    ddd = ddd.map((item) => {
      return {
        id: item.shapeId
      }
    })
    var arrx = [];
    for (let i = 0; i < ddd.length; i++) {
      arrx.push(await collection.findOne(ddd[i], {
        content: 0
      }))
    }
    res.send({
      status: AJ_STATUS.success,
      message: AJ_MESSAGE.success,
      result: {
        info: {
          page: Number(req.query.page || DEFAULT_PAGE.page),
          total: total,
          limit: Number(req.query.limit || DEFAULT_PAGE.limit),
        },
        data: arrx
      }
    })
  } else {
    total = await collection.count(find)
    data = await collection.find(find, {
        content: 0
      })
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
  }

})




/**
 * 获取某个svg的content? js是否可以根据svg url拿到content?
 */
app.get('/aj/shape/getContent', async (req, res) => {
  const collection = dbHandel.getModel('shape')
  const data = await collection.findOne({
    id: req.query.id
  })
  /* 添加到最近使用 */
  const usedCollection = dbHandel.getModel('used_shapes')
  let docs = await usedCollection.findOne({
    uid: userId,
    shapeId: Number(req.query.id)
  });
  if (docs) {
    await usedCollection.update({
      uid: userId,
      shapeId: Number(req.query.id),
    }, {
      usedTime: new Date().getTime()
    })
  } else {
    await new usedCollection({
      uid: userId,
      shapeId: Number(req.query.id),
      usedTime: new Date().getTime()
    }).save();
  }

  /* end 添加到最近使用 */
  res.send({
    status: AJ_STATUS.success,
    message: AJ_MESSAGE.success,
    result: data.content
  })
})




/**
 * 获取形状的导航信息
 */
app.get('/aj/music/nav', async (req, res) => {
  const collection = dbHandel.getModel('desc')
  let {
    music = []
  } = await collection.findOne();
  res.send({
    status: AJ_STATUS.success,
    message: AJ_MESSAGE.success,
    result: music
  })
})
/**
 * 获取音乐的接口
 */
app.get('/aj/music/get', async (req, res) => {
  const collection = dbHandel.getModel('music')
  const page = Number(req.query.page) || DEFAULT_PAGE.page
  const limit = Number(req.query.limit) || DEFAULT_PAGE.limit
  let find = {}
  req.query.typeId && (find.typeId = req.query.typeId)
  const total = await collection.count(find)
  const data = await collection.find(find)
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
 * 
 */

// app.get('/aj/shape/gggg', async (req, res) => {
//   const collection = dbHandel.getModel('desc')
//   const shapeCollection = dbHandel.getModel('shape')
//   let {
//     shape
//   } = await collection.findOne();

//   for (let i = 0; i < shape.type.length; i++) {
//     // let docs = glob.sync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/${shape.type[i].name}/*.json`);
//     // console.log(docs);
//     // for (let j = 0; j < docs.length; j++) {
//     //   let json = JSON.parse(fs.readFileSync(docs[j], 'utf-8'));
//     //   // console.log(json)

//     //   for(let z = 0; z < json.length; z++){
//     //     console.log(path.basename(json[z].path))
//     //   }
//     // }
//     let typeId = shape.type[i].typeId;
//     for (let j = 0; j < shape.type[i].children.length; j++) {
//       // console.log(j)
//       let child = shape.type[i].children[j];
//       let json = JSON.parse(fs.readFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/${shape.type[i].name}/${child.name}.json`, 'utf-8'));
//       // console.log(docs)
//       for (let z = 0; z < json.length; z++) {
//         let paths = path.basename(json[z].path);
//         await shapeCollection.update({
//           path: paths
//         }, {
//           typeId: typeId,
//           tagId: child.tagId
//         })
//       }
//     }

//   }
//   res.send({
//     data: shape
//   })
// })







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
