const mongoose = require('mongoose');

const newsCommentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    newsId: {
        type: String,
        required: true,
    }
});

const newsComment = mongoose.model('newsComment', newsCommentSchema);

module.exports = newsComment;
