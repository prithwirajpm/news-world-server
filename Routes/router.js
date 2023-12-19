const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const newsController = require('../Controller/newsController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// Register aPI
router.post('/user/register',userController.register)


// LoginAPI
router.post('/user/login', userController.login);

// addNews
router.post('/news/add',jwtMiddleware,multerConfig.single('newsImage'),newsController.addNews)

// getUserNews
router.get('/user/all-news',jwtMiddleware,newsController.alluserNews)

// getAllNews
router.get('/user/all',newsController.allNews)

// export router
module.exports = router