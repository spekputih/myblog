const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const postController = require("./controllers/postController")
const followController = require("./controllers/followController")


// router for userController
router.get("/", userController.home)
router.get("/login", userController.login)
router.get("/register", userController.register)
router.get("/blog", userController.blog)
router.get("/gallery", userController.gallery)
router.get("/blog/list", userController.blogList)
router.get("/admin", userController.admin)
router.post("/register", userController.postRegister)
router.post("/login", userController.postLogin)
router.post("/signout", userController.signOut)
router.post("/isUsernameExist", userController.isUsernameExist)
router.post("/isLastnameExist", userController.isLastnameExist)
router.post("/isEmailExist", userController.isEmailExist)

// profile related router
router.get("/profile/:firstname&:lastname", userController.ifUserExist, userController.sharedProfileData, userController.profilePostsScreen)
router.get("/profile/:firstname&:lastname/followers", userController.ifUserExist, userController.sharedProfileData, userController.getFollowers)
router.get("/profile/:firstname&:lastname/following", userController.ifUserExist, userController.sharedProfileData, userController.getFollowing)

// router for postController
router.get("/create-post", userController.mustBeLoggedIn, postController.getPost)
router.post("/create-post", userController.mustBeLoggedIn, postController.createPost)
router.get("/post/:id", postController.viewSingle)
router.get("/post/:id/edit", userController.mustBeLoggedIn, postController.viewEditPage)
router.post("/post/:id/edit", userController.mustBeLoggedIn, postController.edit)
router.post("/post/:id/delete", userController.mustBeLoggedIn, postController.delete)
router.post("/search", postController.search)

// follow related router

router.post("/addFollow/:firstname&:lastname", userController.mustBeLoggedIn, followController.addFollow)
router.post("/removeFollow/:firstname&:lastname", userController.mustBeLoggedIn, followController.removeFollow)



module.exports = router