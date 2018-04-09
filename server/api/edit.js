let app = require('../app.js')
const dbHandel = require('../db/handel.js')
const fs = require('fs')
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
 * 列表页， 保存
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

app.get('/aj/shape/getContent', async (req, res) => {
    const collection = dbHandel.getModel('shape')
    const data = await collection.findOne({
        id: req.query.id
    })
    let docs = fs.readFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg/${data.path}`, 'utf-8');
    console.log(docs)
    res.send({
        status: AJ_STATUS.success,
        message: AJ_MESSAGE.success,
        result: docs
    })
})



/**
 * 列表页， 添加
 */
// let data = require('../../../myh5-static/svg-json/')
// let glob = require('glob')
// let fs = require('fs');
// let docs = glob.sync('/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*/*.json');
// console.log(docs)
// let path = require('path')
// const collection = dbHandel.getModel('shape')
// let aaa = 400000000;
// for(let i = 0; i < docs.length; i++){
//     let file = JSON.parse(fs.readFileSync(docs[i], 'utf-8'));
//     for(let j = 0; j < file.length; j++){
//         new collection({
//             path: path.basename(file[j].path),
//             id:aaa++
//         }).save((err, docs) => {

//         })
//     }

//     break;
// }
// app.get('/aj/shape/add', async (req, res) => {


//     const collection = dbHandel.getModel('shape')
//     const count = await collection.count()
//     new collection({
//         // id: count + 1,
//         // username: '9999'
//     }).save((err, docs) => {
//         if (err) throw err
//         res.send({
//             status: AJ_STATUS.success,
//             message: AJ_MESSAGE.success,
//             result: {}
//         })
//     })
//     // res.send({
//     //     status: AJ_STATUS.success,
//     //     message: AJ_MESSAGE.success,
//     //     result: {}
//     // })
// })
