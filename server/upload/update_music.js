const fs = require('fs')
const glob = require('glob')
var request = require('request');
var path = require('path')

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


let fileList = glob.sync(`/Users/BraisedCakes/Desktop/2018/myh5-store/musics/*.json`);
let allNum = 0;
(async function () {
  for (let i = 0; i < fileList.length; i++) {
    let docs = JSON.parse(fs.readFileSync(fileList[i], 'utf-8'));
    for (let j = 0; j < docs.length; j++) {
      console.log(`${path.basename(fileList[i])}类型共需下载${docs.length}张， 已下载${j}张`)
      if (!docs[j].path) {
        console.log('path不存在')
        continue;
      }
      if (glob.sync(`/Users/BraisedCakes/Desktop/2018/myh5-store/music/${path.basename(docs[j].path)}`).length != 0) {
        continue;
      }
      let fileUrl = `http://res1.eqh5.com/${docs[j].path}`;
      let filename = `/Users/BraisedCakes/Desktop/2018/myh5-store/music/${path.basename(docs[j].path)}`;
      await downloadFile(fileUrl, filename)
    }
  }
})()
