let mongoose = require('mongoose')
let db = mongoose.createConnection('mongodb://localhost/test')
mongoose.Promise = Promise
module.exports = db