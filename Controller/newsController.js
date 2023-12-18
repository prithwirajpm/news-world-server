const news = require('../Models/newsSchema')
// add News Logic
exports.addNews = (req,res)=>{
    console.log("Inside add Project function");
    const userId = req.payload
    console.log(`${userId}`);
    res.status(200).json("addNews Request Recieved!!!")
}