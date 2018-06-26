module.exports = {
    "myh5": {
        "id": {
            type: Number,
            required: true,
            description: '作品id'
        },
        "title": {
            type: String,
            required: true,
            description: '作品title'
        },
        'domain': {
            type: String,
            required: false,
            default: 'http://p7d4z759a.bkt.clouddn.com/'
        },
        "portrait": {
            type: String,
            required: false,
            description: '背景图'
        },
        "desc": {
            type: String,
            required: false,
            description: '作品描述'
        },
        "createTime": {
            type: Number,
            required: true,
            description: '创建时间'
        },
        "updateTime": {
            type: Number,
            required: true,
            description: '编辑时间'
        },
        "data": {
            type: Object,
            required: false,
            default: {},
            description: '作品数据'
        },
        "publishData": {
            type: Object,
            required: false,
            default: {},
            description: '发布时的数据'
        },
        "status": {
            type: Number,
            default: 0,
            description: '保存状态，0:正常 1:回收站，2:彻底删除'
        },
        "publishStatus": {
            type: Number,
            default: 0,
            description: '发布状态，0:未发布，1:已发布且无修改，2:已发布且有修改'
        },
        "uid": {
            type: Number,
            required: true,
            description: '创建者的uid'
        }
    },
    "shape": {
        "path": {
            type: String,
            required: true
        },
        'domain': {
            type: String,
            required: false,
            default: 'http://p7d4z759a.bkt.clouddn.com/'
        },
        "space": {
            type: String,
            required: false
        },
        "content": {
            type: String,
            required: false
        },
        "name": {
            type: String,
            required: false
        },
        "id": {
            type: Number,
            required: true
        },
        "typeId": {
            type: String,
            required: false
        },
        "tagId": {
            type: String,
            required: false
        }
    },
    "desc": {
        "id": {
            type: Number,
            required: true
        },
        "shape": {
            type: Array,
            required: false
        },
        "music": {
            type: Array,
            required: false
        },
        "image": {
            type: Array,
            required: false
        }
    },
    "pic_admin": {
        types: {
            type: Array,
            required: false,
            default: []
        }
    },
    'user': {
        'password': {
            type: String,
            required: true
        },
        'username': {
            type: String,
            required: true
        },
        'uid': {
            type: Number,
            required: true
        }
    },
    'used_shapes': {
        'uid': {
            type: Number,
            required: true
        },
        'shapeId': {
            type: Number,
            required: true
        },
        'usedTime': {
            type: Number,
            required: true
        }
    },
    'used_musics': {
        'uid': {
            type: Number,
            required: true
        },
        'musicId': {
            type: Number,
            required: true
        },
        'usedTime': {
            type: Number,
            required: true
        }
    },
    'used_images': {
        'uid': {
            type: Number,
            required: true
        },
        'imageId': {
            type: Number,
            required: true
        },
        'usedTime': {
            type: Number,
            required: true
        }
    },
    'images': {
        'uid': {
            type: Number,
            required: false
        },
        'domain': {
            type: String,
            required: false,
            default: 'http://p7d4z759a.bkt.clouddn.com/'
        },
        'path': {
            type: String,
            required: true
        },
        'id': {
            type: Number,
            required: true
        },
        'createTime': {
            type: Number,
            required: true
        },
        'size': {
            type: Number,
            required: false
        },
        'name': {
            type: String,
            required: false
        },
        'typeId': {
            type: String,
            required: false
        },
        'width': {
            type: Number,
            required: false
        },
        'height': {
            type: Number,
            required: false
        },
        'isPublic': {
            type: Boolean,
            required: false,
            default: false
        }
    },
    'musics': {
        'domain': {
            type: String,
            required: false,
            default: 'http://p7d4z759a.bkt.clouddn.com/'
        },
        'path': {
            type: String,
            required: true
        },
        'name': {
            type: String,
            required: false
        },
        'typeId': {
            type: String,
            required: false
        },
        'id': {
            type: Number,
            required: true
        },
        'createTime': {
            type: Number,
            required: true
        },
        'uid': {
            type: Number,
            required: false
        }
    }
}
