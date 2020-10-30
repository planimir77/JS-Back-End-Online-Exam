const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    plays: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Play',
    },],
});

module.exports = mongoose.model('User', userSchema, 'users');
