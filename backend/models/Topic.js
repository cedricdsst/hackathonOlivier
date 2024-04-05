
const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    fileUrl: { type: String, required: false },
    fileType: { type: String, required: false },
    userId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    creationDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Topic', topicSchema);

