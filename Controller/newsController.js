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
