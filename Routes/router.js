const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const newsController = require('../Controller/newsController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

// Register aPI
router.post('/user/register',userController.register)


// LoginAPI
router.post('/user/login', userController.login);

// addNews
router.post('/news/add',jwtMiddleware,newsController.addNews)


// export router
module.exports = router