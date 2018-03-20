module.exports = {
	"pic_admin" : {
		types : { type: Array, required: false, default : [] }
	},
	"myh5": {
		"type": { type: String, required: false },
		"work_id": { type: Number, required: true },
		"bg": { type: String, required: false },
		"data": { type: Object, required: false},
		"username": { type: String, required: true }
	},
	'user': {
		'password': { type: String, required: true },
		'username': { type: String, required: true },
		'uid' : {type: Number, required: true },
		'createTime' : {type: Object, required: true},
		'admin' : {type : Number, required:false}
	},
	'pics': {
		'username': { type: String, required: false },
		'src': { type: String, required: true },
		'id': { type: String, required: true },
		'sourceId': { type: String, required: false },
		'width': { type: Number, required: false },
		'height': { type: Number, required: false },
		'type' : { type: Object, required: false },
		'types' : { type: String, required: false },
		'createTime' : { type: String, required: false },
	},
	'music': {
		'src': { type: String, required: true },
		'name': { type: String, required: false },
		'type' : { type: String, required: false },
		'sourceId': { type: String, required: false },
		'id': { type: String, required: false },
		'createTime' : { type: String, required: false },
	}
}
