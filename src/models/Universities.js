const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const universitiesSchema = new Schema({
        "name":{
            type: String,
            require: true
        },
        "country":{
            type: String,
            require: true
        },
        "state_province":{
            type: String,
            require: true
        },
        "web_pages": Array,
        "domains": Array
})

module.exports = mongoose.model('Universities', universitiesSchema);