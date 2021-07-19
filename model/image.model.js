const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    repository: {
        type: String
    },
    version: {
        type: String
    },
    metaData: {
        type: Object
    }
}, {
    collection: 'images'
})

module.exports = mongoose.model('imageSchema', imageSchema)