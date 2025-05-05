const mongoose = require('mongoose')

const personSchema= new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true},
    country: {type: String, require: true},
})

module.exports = mongoose.model('Person', personSchema, 'person')