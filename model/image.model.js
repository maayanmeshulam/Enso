const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String, required: true, unique: true
    },
    repository: {
        type: String, required: true 
    },
    version: {
        type: String, required: true 
    },
    metaData: {
        type: Object
    }
},
 {
     timestamps: true
 },
 {
    collection: 'images'
})

module.exports = mongoose.model('imageSchema', imageSchema)
