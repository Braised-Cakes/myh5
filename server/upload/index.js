const {
    promisify
} = require('util')
var qiniu = require("qiniu")
const {
    ACCESS_KEY,
    SECRET_KEY
} = require('../../.key.js')
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: 'store',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);



// function token(bucket, key) {
//     var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key)
//     return putPolicy.token()
// }
// /**
//  * 保存
//  * @param key 文件名 basename
//  * @param localFile 本地路径
//  * @param cb 回调函数
//  * @return 成功返回 true
//  */
// // module.exports.uploadFile = promisify((key, localFile, cb) => {
// //     var uptoken = token(bucket, key)
// //     var extra = new qiniu.io.PutExtra()
// //     // qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
// //     //     if (!err) {
// //     //         // 上传成功， 处理返回值
// //     //         cb(null, true)
// //     //     } else {
// //     //         // 上传失败， 处理返回代码
// //     //         console.log(err)
// //     //     }
// //     // })
// // })
// module.exports.uploadFile = function (key, localFile) {
//     return new Promise((resolve, reject) => {
//         var uptoken = token(bucket, key)
//         var extra = new qiniu.io.PutExtra()
//         qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
//             if (!err) {
//                 // 上传成功， 处理返回值
//                 resolve()
//             } else {
//                 // 上传失败， 处理返回代码
//                 console.log(err)
//                 reject();
//             }
//         })
//     })
// }
