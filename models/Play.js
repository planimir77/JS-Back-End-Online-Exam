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

playSchema.pre('save', function (next) {
    const now = Date.now()
     
    //this.updatedAt = now
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now
    }
    
    // Call the next function in the pre-save chain
    next()    
  })

module.exports = mongoose.model('Play', playSchema, 'plays');
