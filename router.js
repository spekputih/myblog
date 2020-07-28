const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const postController = require("./controllers/postController")


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

// profile related router
router.get("/profile/:firstname&:lastname", userController.ifUserExist, userController.profilePostsScreen)


// router for postController
router.get("/create-post", userController.mustBeLoggedIn, postController.getPost)
router.post("/create-post", userController.mustBeLoggedIn, postController.createPost)
router.get("/post/:id", postController.viewSingle)
router.get("/post/:id/edit", userController.mustBeLoggedIn, postController.viewEditPage)
router.post("/post/:id/edit", userController.mustBeLoggedIn, postController.edit)



module.exports = router