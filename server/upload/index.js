// // var qiniu = require("qiniu")
// const dbHandel = require('../db/handel.js')

// // ;
// // (async (res) => {
// //   let collection = dbHandel.getModel('shape')
// //   let docs = await collection.find({
// //     path : '8fbd0751-b8d3-4cc3-8798-a68673437654.svg'
// //   })
// //   console.log(docs)
// // })();



// const glob 


const {
  AccessKey,
  SecretKey
} = require('../../.key.js')
var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);

var options = {
  scope: 'store',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);


var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;

let glob = require('glob')
// let b = glob.sync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg/*.svg`)
// console.log(b.length)
// return;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();



var localFile = "/Users/BraisedCakes/Desktop/2018/myh5-store/svg/yq0KZVbqS6mAaReOAABLqGlUGoM448.svg";
var key = 'yq0KX1bg6PCAalnlAAAK3WnoBek138.svg';
// 文件上传

function upload(localFile, key) {
  return new Promise((resolve) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
      resolve(true)
    });
  })
}

(async (req, res) => {
  let collection = dbHandel.getModel('shape')
  let data = await collection.find({})
  let count = await collection.count({})
  for (let i = 0; i < data.length; i++) {
    console.log(`共${count}个， 已经处理${i}个`);
    let one = await collection.findOne({
      path: data[i].path,
      space: 'qiniu'
    })
    if (one) {
      continue;
    }
    let localFile = `/Users/BraisedCakes/Desktop/2018/myh5-store/svg/${data[i].path}`;
    let key = data[i].path;
    await upload(localFile, key)
    await collection.update({
      path: key
    }, {
      space: 'qiniu'
    })
  }
})()
