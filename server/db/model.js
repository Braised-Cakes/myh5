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
    "bg": {
      type: String,
      required: false
    },
    "data": {
      type: Object,
      required: false
    },
    "username": {
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
  'pics': {
    'username': {
      type: String,
      required: false
    },
    'src': {
      type: String,
      required: true
    },
    'id': {
      type: String,
      required: true
    },
    'sourceId': {
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
    'type': {
      type: Object,
      required: false
    },
    'types': {
      type: String,
      required: false
    },
    'createTime': {
      type: String,
      required: false
    },
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
    'createTime': {
      type: Number,
      required: false
    },
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
    }
  }
}
