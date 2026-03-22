const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',    
        required: true
    },
    music: [{   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'    
    }]
});

const albumModel = mongoose.model('Album', albumSchema);

module.exports = albumModel;