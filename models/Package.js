const { Schema, model } = require('mongoose');

const packageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    thumbnail: String,
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: String
}, { timestamps: true });

const Package = model('Package', packageSchema);
module.exports = Package;