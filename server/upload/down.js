const dbHandel = require('../server/db/handel.js')
let collection = dbHandel.getModel('shape')
const fs = require('fs')
const request = require('request')
function downloadFile(uri, filename) {
  var stream = fs.createWriteStream(filename);
  return new Promise((resolve, reject) => {
    request(uri).pipe(stream).on('close', function () {
    //   let timer = parseInt(Math.random() * 1000) + 500;
    //   setTimeout(() => {
        resolve();
    //   }, timer)
    });
  })
}


(async () => {
    let docs = await collection.find();
    // console.log(docs)
    for(let i = 0; i < docs.length; i++){
        let url = `http://p7d4z759a.bkt.clouddn.com/${docs[i].path}`;
        
        await downloadFile(url, '/Users/BraisedCakes/Desktop/2018/myh5-store/svg/' + docs[i].path)
        console.log('当前第' + i + '个');
    }
})()
