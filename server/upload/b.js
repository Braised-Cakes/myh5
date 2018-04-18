const dbHandel = require('../db/handel.js')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
let docs1 = glob.sync(`/Users/BraisedCakes/Desktop/2018/myh5-store/svg-json/*`);
let id = 400000000;
let shape2 = dbHandel.getModel('shape')
let desc = dbHandel.getModel('desc')

// shape2.find({}, (err, docs) => {
//   for (let i = 0; i < docs.length; i++) {
//     if (docs[i].tagId.indexOf(',') != -1) {
//       console.log(docs[i].tagId)
//     }
//   }
// })

;
(async () => {
  let descDocs = await desc.findOne({});
  for (let i = 0; i < docs1.length; i++) {
    let docs2 = glob.sync(`${docs1[i]}/*.json`);
    for (let j = 0; j < docs2.length; j++) {
      let data = JSON.parse(fs.readFileSync(docs2[j], 'utf-8'));
      //data   当前文件的json数据
      for (let z = 0; z < data.length; z++) {
        let shapePath = path.basename(data[z].path)

        let itemData = await shape2.findOne({
          path: shapePath
        })
        if (!itemData) {
          await new shape2({
            path: shapePath,
            id: id++,
            name: data[z].name,
            typeId: String(descDocs.shape.type[i].typeId),
            tagId: String(descDocs.shape.type[i].children[j].tagId)
          }).save();
        } else {
          let typeId = itemData.typeId.split(',');
          let tagId = itemData.tagId.split(',');
          if (typeId.indexOf(String(descDocs.shape.type[i].typeId)) == -1) {
            typeId.push(String(descDocs.shape.type[i].typeId));
          }
          if (tagId.indexOf(String(descDocs.shape.type[i].children[j].tagId)) == -1) {
            tagId.push(String(descDocs.shape.type[i].children[j].tagId));
            console.log(tagId)
            console.log(shapePath)
            console.log(typeId.join(','))
          }
          
          await shape2.update({
            path: shapePath
          }, {
            tagId: tagId.join(','),
            typeId: typeId.join(',')
          })
        }
        // console.log(`${id}`)
      }
    }
  }
  console.log('done')
})();
