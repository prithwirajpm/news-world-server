const mongoose = require('mongoose');

const newsLikeDislikeSchema = new mongoose.Schema({
    newsId: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
});

const newsLikeDislike = mongoose.model('newsLikeDislike', newsLikeDislikeSchema);

module.exports = newsLikeDislike;
