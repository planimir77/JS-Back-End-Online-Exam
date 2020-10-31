const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },],
});

module.exports = mongoose.model('Play', playSchema, 'plays');
