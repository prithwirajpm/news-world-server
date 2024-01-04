const news = require('../Models/newsSchema')
// add News Logic
exports.addNews = async(req,res)=>{
    console.log("Inside add Project function");
    const userId = req.payload
    const newsImage = req.file.filename
    console.log(newsImage);
    const {newsTitle,newsDetails,newsDate}=req.body 
    // console.log(`${newsTitle},${newsDetails},${newsDate},${newsImage},${userId}`);
   try{
    const existingNews = await news
    if(existingNews){ 
        const newNews = new news({
            newsTitle,newsDetails,newsDate,newsImage,userId
        })
        await newNews.save()
        res.status(200).json(newNews)
    }

   }catch(err){
    res.status(401).json(`Request failed , Error: ${err}`)
   }
   
   
}

// getuserprojects
exports.alluserNews = async(req,res)=>{
    const userId = req.payload
    try{
        const userNews = await news.find({userId})
        res.status(200).json(userNews)
    }catch(err){
        res.status(401).json(err)
    }
}


// getallNews
exports.allNews = async(req,res)=>{
    try{
        const allNewsDetails = await news.find()
        res.status(200).json(allNewsDetails)
    }catch(err){
        res.status(401).json(err)
    }
}



// editNews
exports.editNewsController = async (req,res)=>{
    // get project id
    const {id}=req.params
    const userId = req.payload
    const {newsTitle,newsDetails,newsDate,newsImage}=req.body 
    const uploadNewsImage = req.file?req.file.filename:newsImage
    try{
        const updateNews = await news.findByIdAndUpdate({_id:id},{
            newsTitle,newsDetails,newsDate,"newsImage":uploadNewsImage,userId
        },{new:true})
        await updateNews.save()
        res.status(200).json(updateNews)
    }catch(err){
        res.status(401).json(err)
    }

}


// deleteNews
exports.deleteNewsController = async(req,res)=>{
    const {id} = req.params
    try{
        const removeNews = await news.findByIdAndDelete({_id:id})
        res.status(200).json(removeNews)

    }catch(err){
        res.status(401).json(err)
    }
}


exports.ReportCount = async (req, res) => {
    try {
        const {id}=req.params
        // Find the existing record or create a new one if it doesn't exist
        let updatedReportCount = await news.findOneAndUpdate(
            { _id:id },
            { $inc: { blockSection: 1 } }, // Increment the blockSection by 1
            { new: true, upsert: true } // Return the updated document, create if it doesn't exist
        );
        res.status(200).json(updatedReportCount);
    } catch (err) {
        res.status(401).json(err);
    }
};


