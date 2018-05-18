module.exports = {
  "myh5": {
    "type": {
      type: String,
      required: false
    },
    "id": {
      type: Number,
      required: true
    },
    "show": {
      type: Boolean,
      required: false,
      default: true
    },
    "uid": {
      type: Number,
      required: true
    },
    "bg": {
      type: String,
      required: false
    },
    "createTime": {
      type: Number,
      required: true
    },
    "data": {
      type: Object,
      required: false,
      default: {}
    },
    "title": {
      type: String,
      required: true
    },
    "desc": {
      type: String,
      required: false
    }
  },
  "shape": {
    "path": {
      type: String,
      required: true
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
