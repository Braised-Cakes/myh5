let dbHandel = require('../db/handel.js')
let collection = dbHandel.getModel('myh5')

module.exports = {
  // 获取场景数量
  getSceneCount(data = {}) {
    return collection.countDocuments(data)
  },

  // 添加场景
  addScene(data) {
    return new collection(data).save()
  },

  // 获取场景列表
  getSceneList(data, { page, limit }) {
    return collection
      .find(data)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updateTime: -1 })
  },

  // 获取指定场景
  getSceneById(id) {
    return collection.findOne({ id: id })
  },

  // 更新指定场景
  updateSceneById(id, data) {
    return collection.update({ id: id }, data)
  },

  // 删除指定场景
  delSceneById(id) {
    return collection.update({ id: id }, { status: 3 })
  }
}