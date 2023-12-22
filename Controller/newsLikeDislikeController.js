const newsLikeDislike = require('../Models/newsLikeDislikeSchema');
// like
exports.likeNewsController = async (req, res) => {
    try {
        // Find the existing record or create a new one if it doesn't exist
        let updatedNewsLike = await newsLikeDislike.findOneAndUpdate(
            { newsId: req.params.id},
            { $inc: { likes: 1 } }, // Increment the likes by 1
            { new: true, upsert: true } // Return the updated document, create if it doesn't exist
        );
        await updatedNewsLike.save()   
        res.status(200).json(updatedNewsLike);
    } catch (err) {
        res.status(401).json(err);
    }
};



// DIslike
exports.dislikeNews = async (req, res) => {
    try {
        // Find the existing record or create a new one if it doesn't exist
        let updatedNewsLike = await newsLikeDislike.findOneAndUpdate(
            { newsId: req.params.id},
            { $inc: { dislikes: 1 } }, // Increment the dislikes by 1
            { new: true, upsert: true } // Return the updated document, create if it doesn't exist
        );
        await updatedNewsLike.save()
        res.status(200).json(updatedNewsLike);
    } catch (err) {
        res.status(401).json(err);
    }
};

// getLIkeAndDislike
exports.getLikesAndDislikes = async (req, res) => {
    try {
        const newsId = req.params.id;

        // Find the likes and dislikes for the specified news item
        const likesAndDislikes = await newsLikeDislike.findOne({ newsId });

        res.status(200).json(likesAndDislikes);
    } catch (err) {
        res.status(401).json(err);
    }
};