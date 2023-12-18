const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    newsTitle:{
        type:String,
        required:true,
    },
    newsDetails:{
        type:String,
        required:true,
       
    },
    newsDate:{
        type:String,
        required:true,

    },
    newsImage:{
        type:String,
        required:true,

    },
    userId:{
        type:String,
        required:true,
    }

})



const news = mongoose.model('news', newsSchema);

module.exports = news;