const superagent = require('superagent')
var qiniu = require("qiniu")
const dbHandel = require('../server/db/handel.js')
let descCollection = dbHandel.getModel('desc')
let imageCollection = dbHandel.getModel('images')
const rimraf = require('rimraf')
const request = require('request')
const glob = require('glob')
const fs = require('fs');



const {
  AccessKey,
  SecretKey
} = require('../.key.js')
var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
let path = require('path')
var options = {
  scope: 'image',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);




var config = new qiniu.conf.Config();
// // 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
// var resUrl = 'http://devtools.qiniu.com/qiniu.png';
var bucket = "image";
// var key = "qiniu.png";
var bucketManager = new qiniu.rs.BucketManager(mac, config);


// var formUploader = new qiniu.form_up.FormUploader(config);
// var putExtra = new qiniu.form_up.PutExtra();

function requestType() {
  return new Promise((resolve, reject) => {
    superagent.post(`http://store.eqxiu.com/api/category/getCategoryListById?id=889874`).set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      'Content-Type': 'application/x-www-form-urlencoded'
    }).end(function (err, res) {
      if (err) {
        throw err
      }
      if (err) {
        reject();
      } else {
        resolve(res && res.body && res.body.list || [])
      }
    });
  })
}



function requestData(type, page) {
  return new Promise((resolve, reject) => {
    superagent.get(`http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=1&category=${type}&pageNo=${page}&pageSize=18`).set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      'Content-Type': 'application/x-www-form-urlencoded'
    }).end(function (err, res) {
      if (err) {
        throw err
      }
      if (err) {
        reject();
      } else {
        resolve(res && res.body && res.body.list || [])
      }
    });
  })
}


function downloadFile(uri, filename) {
  var stream = fs.createWriteStream(filename);
  return new Promise((resolve, reject) => {
    request(uri).pipe(stream).on('close', function () {
      let timer = parseInt(Math.random() * 1000) + 500;
      setTimeout(() => {
        resolve();
      }, timer)
    });
  })
}

// // downloadFile('http://res1.eqh5.com/store/aca1a7168f58c9c39cdd70ef67ecce19.mp3', '2.mp3')

function uploadQiniu(localFile, key) {
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


/** 设置type */
// (async function () {
//   let typeList = await requestType();
//   console.log(typeList)

//   let {
//     image = []
//   } = await descCollection.findOne();
//   let arr = image;
//   let initTypeId = image.length + 20000;
//   for (let i = 0; i < typeList.length; i++) {
//     if (!arr.some((item) => {
//         return item.eqxiuId == typeList[i].id
//       })) {
//       arr.push({
//         name: typeList[i].name,
//         typeId: initTypeId++,
//         eqxiuId: typeList[i].id
//       });
//     }
//   }
//   await descCollection.update({}, {
//     image: arr
//   });
//   console.log('desc-image   done')
// })()



function getStat(key) {
  return new Promise((resolve) => {
    bucketManager.stat(bucket, key, function (err, respBody, respInfo) {
      if (err) {
        console.log(err);
        //throw err;
      }
      console.log(respBody)
      resolve(respBody.hash)
    });
  })
}

(async ()=>{
  await getStat('6299f98466e4b647b8fbdffe070a14e7.gif')
})()
function fetchQiniu(resUrl, key) {
  return new Promise((resolve) => {
    bucketManager.fetch(resUrl, bucket, key, function (err, respBody, respInfo) {
      if (err) {
        console.log(err);
        //throw err;
      }
      resolve()
    });
  })
}






/**
 * 将所有数据存到数据库, 没有的保存， 有的就更新
 */
// ;
// (async () => {
//   let {
//     image: imageDocs
//   } = await descCollection.findOne();
//   let successIndex = 0;
//   let existIndex = 0;
//   let notPathIndex = 0;
//   let count = await imageCollection.count();
//   let id = 200000000 + count;
//   for (let i = 0; i < imageDocs.length; i++) {
//     for (let j = 0; j < 100000; j++) {
//       let data = await requestData(imageDocs[i].eqxiuId, j + 1);
//       if (data.length == 0) {
//         break;
//       }
//       for (let k = 0; k < data.length; k++) {
//         if (!data[k].path) {
//           console.log('path不存在')
//           notPathIndex++;
//           continue;
//         }
//         let fileUrl = `http://res1.eqh5.com/${data[k].path}`;
//         let key = path.basename(data[k].path);
//         if (!await getStat(key)) {
//           await fetchQiniu(fileUrl, key)
//           successIndex++;
//         } else {
//           existIndex++;
//         }
//         console.log(`已经存在${existIndex}个, 新上传${successIndex}个`);

//         let itemPath = path.basename(data[k].path);
//         let itemDocs = await imageCollection.findOne({
//           path: itemPath
//         })
//         if (!itemDocs) {
//           await new imageCollection({
//             path: itemPath,
//             name: data[k].name,
//             typeId: String(imageDocs[i].typeId),
//             id: id++
//           }).save();
//           console.log(`第${successIndex}个保存完成`)
//         } else {
//           let itemTypeId = itemDocs.typeId.split(',');
//           if (itemTypeId.indexOf(String(imageDocs[i].typeId)) == -1) {
//             itemTypeId.push(String(imageDocs[i].typeId));
//           }
//           await imageCollection.update({
//             path: itemPath
//           }, {
//             typeId: itemTypeId.join(','),
//           })
//           console.log(`第${successIndex}个更新完成`)
//         }
//         // successIndex++;
//       }

//     }

//   }
//   console.log(`path不存在的共${notPathIndex}个`)
// })()
