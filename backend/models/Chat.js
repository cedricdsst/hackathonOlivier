
const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true },
    topicId: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Chat', ChatSchema);

