var mongoose = require('mongoose')
var db = mongoose.createConnection('mongodb://localhost/test')
mongoose.Promise = Promise
module.exports = db
