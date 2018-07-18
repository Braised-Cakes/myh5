const superagent = require('superagent')
var qiniu = require("qiniu")
const dbHandel = require('../server/db/handel.js')
let collection = dbHandel.getModel('shape')
let desc = dbHandel.getModel('desc')
const request = require('request')
const fs = require('fs')
const {
  AccessKey,
  SecretKey
} = require('../.key.js')
var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
let path = require('path')
var options = {
  scope: 'public',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);


var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;

let glob = require('glob')

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();



;


function requestType(typeId) {
  return new Promise((resolve, reject) => {
    superagent.get(`http://service.eqxiu.com/m/base/file/tag/sys?bizType=${typeId}`).set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
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



function requestTag(typeId, tagId, page) {
  console.log(typeId, tagId, page)
  return new Promise((resolve, reject) => {
    superagent.get(`http://service.eqxiu.com/m/material/sysList?bizType=${typeId}&fileType=7&pageNo=${page}&pageSize=18&tagId=${tagId}`).set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
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


function downloadFile(uri, filename, callback) {
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



function uploadQiniu(localFile, key) {
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

let typeList = [{
  id: 8201,
  name: '图形'
}, {
  id: 8202,
  name: '图标'
}, {
  id: 8203,
  name: '文字'
}];
// (async () => {
//   let descData = await desc.findOne();
//   let arr;
//   if (!descData) {
//     arr = []
//   } else {
//     arr = descData.shape
//   }
    //  let initTypeId = arr.length + 400;
    //  let initTagId = 40000; 
    // arr.forEach((item)=>{
    //   initTagId += item.children.length
    // });
//   console.log(descData)
//   for (let i = 0; i < typeList.length; i++) {
//     //当数据库没有当前大类型时
//     if (!arr.some((item) => {
//         return item.eqxiuBizType == typeList[i].id
//       })) {
//       arr.push({
//         name: typeList[i].name,
//         typeId: initTypeId++,
//         eqxiuBizType: typeList[i].id,
//         children: []
//       });
//       console.log(`创建了新的类型：${typeList[i].name}`)
//     }
//     let typeData = await requestType(typeList[i].id);
//     // console.log(typeData)
//     for (let j = 0; j < typeData.length; j++) {
//       if (!arr[i].children.some((item) => {
//           return item.eqxiuTagId == typeData[j].id
//         })) {
//         arr[i].children.push({
//           name: typeData[j].name,
//           tagId: initTagId++,
//           eqxiuTagId: typeData[j].id
//         })
//         console.log(`创建了新的tag类型：${typeData[j].name}`)
//       }
//     }
//   }
//   desc.update({}, {
//     shape: arr
//   }, function (err, docs) {
//     console.log(err)
//   })
//   console.log('更新typeId && tagId 成功')
// })()

let successIndex = 0; // 已经处理完成的图片
(async () => {
  let descData = await desc.findOne();
  let count = await collection.count();
  let id = 400000000 + count;
  for (let i = 0; i < typeList.length; i++) {
    let typeData = await requestType(typeList[i].id);
    let typeId = descData.shape.filter((item) => {
      return item.eqxiuBizType == typeList[i].id
    })[0].typeId;
    for (let j = 0; j < typeData.length; j++) {
      let tagId = descData.shape[i].children.filter((item) => {
        return item.eqxiuTagId == typeData[j].id
      })[0];
      for (let z = 0; z < 99999; z++) {
        let curData = await requestTag(typeId, tagId.eqxiuTagId, z + 1);
        if (curData.length == 0) {
          break;
        }
        console.log(`大类型：${typeList[i].name}, 小类型:${typeList[i].name}, 第${z + 1}页数据加载完成`)
        for (let k = 0; k < curData.length; k++) {

          let fileUrl = `http://res1.eqh5.com/${curData[k].path}`;
          let filename = `/Users/BraisedCakes/Desktop/2018/myh5-store/shape/${path.basename(curData[k].path)}`;
          let itemData = await collection.findOne({
            path: path.basename(filename)
          });
          if (!itemData) {
            //将单个文件下载到本地
            await downloadFile(fileUrl, filename);
            console.log(`${successIndex}下载到本地成功`)
            //上传到七牛云
            await uploadQiniu(filename, path.basename(filename))
            console.log(`${successIndex}上传到七牛成功`)
            await new collection({
              id: id++,
              path: path.basename(filename),
              name: curData[k].name,
              typeId: typeId,
              tagId: tagId.tagId
            }).save()
            console.log(`${successIndex}新建成功`)
          } else {

            let itemTypeId = itemData.typeId.split(',');
            let itemTagId = itemData.tagId.split(',');

            if (itemTypeId.indexOf(String(descData.shape[i].typeId)) == -1) {
              itemTypeId.push(String(descData.shape[i].typeId));
            }

            if (itemTagId.indexOf(String(descData.shape[i].children[j].tagId)) == -1) {
              itemTagId.push(String(descData.shape[i].children[j].tagId));
            }
            await collection.update({
              path: path.basename(filename)
            }, {
              tagId: itemTagId.join(','),
              typeId: itemTypeId.join(',')
            })
            console.log(`${successIndex}更新成功, 新的tagId${itemTagId.join(',')}, 新的typeId${itemTypeId.join(',')}`)
          }
          successIndex++;
        }
      }
    }
  }
})();



// /**
//  * 接口拿到一个数据， 就下载到本地， 然后上传到七牛云， 然后保存到数据库
//  * 
//  * 1.拿到type的接口
//  * 2.拿到tag的接口
//  * 
//  */
