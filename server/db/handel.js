const mongoose = require('mongoose')
const models = require("./model.js")
const db = require("./index.js")
const Schemas= {}
for (let key in models) {
    Schemas[key] = new mongoose.Schema(models[key])
}

module.exports = {
    getModel: function(item) {
        return db.model(item, Schemas[item])
    }
}
