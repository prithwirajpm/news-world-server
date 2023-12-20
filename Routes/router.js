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

// edit news
router.put('/news/edit/:id',jwtMiddleware,multerConfig.single("newsImage"),newsController.editNewsController)

// delete news
router.delete('/news/remove/:id',jwtMiddleware,newsController.deleteNewsController)

// export router
module.exports = router