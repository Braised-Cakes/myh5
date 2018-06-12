var qiniu = require("qiniu")
const {
    AccessKey,
    SecretKey
} = require('../../.key.js')
const dbHandel = require('../db/handel.js')

var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
// var srcBucket = 'public';
// var destBucket = 'store';
//每个operations的数量不可以超过1000个，如果总数量超过1000，需要分批发送
var moveOperations = [
    // qiniu.rs.moveOp(srcBucket, '00105d08-3252-47cf-b5c5-7f48f430a46c.svg', destBucket, '00105d08-3252-47cf-b5c5-7f48f430a46c.svg')
];

(async () => {
    const collection = dbHandel.getModel('musics');
    let obj = await collection.find().skip(12000).limit(1000);
    obj.forEach((item) => {
        moveOperations.push(
            qiniu.rs.moveOp('music', item.path, 'store', item.path)
        )
    })
    console.log(moveOperations)
    bucketManager.batch(moveOperations, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            // 200 is success, 298 is part success
            if (parseInt(respInfo.statusCode / 100) == 2) {
                respBody.forEach(function (item) {
                    if (item.code == 200) {
                        console.log(item.code + "\tsuccess");
                    } else {
                        console.log(item.code + "\t" + item.data.error);
                    }
                });
            } else {
                console.log(respInfo.deleteusCode);
                console.log(respBody);
            }
        }
    });

})()
