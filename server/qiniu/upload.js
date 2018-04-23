var qiniu = require("qiniu")
const {
  AccessKey,
  SecretKey
} = require('../../.key.js')

module.exports.upload = function (bucket, localFile, key) {
  var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
  var options = {
    scope: bucket,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  var config = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2;
  let glob = require('glob')
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  return new Promise((resolve) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      resolve(true)
    });
  })
}
