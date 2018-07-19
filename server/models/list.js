const dbHandel = require('../db/handel.js')
const collection = dbHandel.getModel('myh5')

module.exports = {
    // 获取场景数量
    getSceneCount(data) {
        return collection.countDocuments(data)
    },

    // 添加场景
    addScene(data) {
        return new collection(data).save()
    },

    // 获取场景列表
    getSceneList(data, {
        page,
        limit
    }) {
        return collection
            .find(data)
            .skip((page - 1) * limit)
            .sort({
                updateTime: -1
            })
            .limit(limit)
    },

    // 获取指定场景
    getSceneById(id) {
        return collection.findOne({
            id: id
        })
    },

    // 更新场景
    updateScene(id, data) {
        return collection.update({
            id: id
        }, data)
    },

    // 删除场景
    delScene(id) {
        return collection.update({
            id: id
        }, {
            status: 3
        })
    }
}
