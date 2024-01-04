const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const newsController = require('../Controller/newsController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const newsCommentController = require('../Controller/newsCommentController')
const newsLikeDislikeController = require('../Controller/newsLikeDislikeController')
const isAdmin = require('../Middlewares/adminMiddleware')
const adminController = require('../Controller/adminController')

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

// addcomment
router.post('/news/addComment/:id',jwtMiddleware,newsCommentController.addCommentController);


// getallCommants
router.get('/news/allComment',newsCommentController.allComments);


// DeleteComment
router.delete('/news/removeComment/:id',jwtMiddleware,newsCommentController.deleteNewsComment);

// LikeandDislike
router.post('/news/likeDislike/:id',jwtMiddleware,newsLikeDislikeController.likeNewsController)

// DisLike
router.put('/news/dislike/:id', jwtMiddleware, newsLikeDislikeController.dislikeNews);

// getLike and DisLike
router.get('/news/likesAndDislikes/:id',newsLikeDislikeController.getLikesAndDislikes);

// admin Register
router.post('/admin/register',userController.registerAdmin)

// admin Show userList
router.get('/admin/viewusers',jwtMiddleware,isAdmin,adminController.viewUsers)

// UpadteReportCount
router.put('/news/reportNews/:id', jwtMiddleware, newsController.ReportCount);

router.put(
    '/user/editprofile/:id',
    jwtMiddleware,
    multerConfig.single('profile'),
    userController.editUserProfile
  );
  

  router.get('/user/allusers',jwtMiddleware,userController.getUserIdes) 

// export router
router.put('/user/editprofile',jwtMiddleware,multerConfig.single("profile"),userController.editUserProfile)
module.exports = router