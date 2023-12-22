const newsComment = require('../models/newsCommentSchema');
const news = require('../Models/newsSchema');

// addComment
exports.addCommentController = async (req, res) => {
    const { newsId, commentText } = req.body;
    const userId = req.payload;

    try {
    const existingNews = await news.find({userId})
    if(existingNews){
        const newComment = new newsComment({
            commentText,
            userId,
            newsId,
        });
        await newComment.save();
        res.status(200).json(newComment);
     }
    } catch (err) {
        res.status(401).json(`Request failed, Error: ${err}`);
    }
};



// all Commentes
exports.allComments = async(req,res)=>{
    try{
        const allNewsComments = await newsComment.find()
        res.status(200).json(allNewsComments)
    }catch(err){
        res.status(401).json(err)
    }
}


// Delete Comment

exports.deleteNewsComment = async(req,res)=>{
    const {id} = req.params
    try{
        const removeNewsComment = await newsComment.findByIdAndDelete({_id:id})
        res.status(200).json(removeNewsComment)

    }catch(err){
        res.status(401).json(err)
    }
}



