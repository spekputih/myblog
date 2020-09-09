const User = require("../models/User")
const Post = require("../models/Post")
const e = require("express")
const Follow = require("../models/Follow")
const { endsWith } = require("lodash")
const usersCollection = require("../db").db().collection("users")


exports.sharedProfileData = async function(req, res, next){
	let isFollowing = false
	let currentUser = false
	
	if (req.session.user){
		isFollowing = await Follow.isVisitorFollowing(req.profileUser._id, req.visitorID)
		currentUser = false	
	}
	if (req.session.user._id == req.profileUser._id){
		currentUser = true
	}

	req.isFollowing = isFollowing
	req.currentUser = currentUser

	// retrieve post, follower and following counts
	let postCountPromise = Post.countPostsByAuthor(req.profileUser._id)
	let followerCountPromise = Follow.countFollowerById(req.profileUser._id)
	let followingCountPromise = Follow.countFollowingById(req.profileUser._id)

	let [postCount, followerCount, followingCount] = await Promise.all([postCountPromise, followerCountPromise, followingCountPromise])
	req.postCount = postCount
	req.followerCount = followerCount
	req.followingCount = followingCount

	console.log(req.postCount + " " + req.followerCount + " " + req.followingCount)
	
	next()
}

exports.isUsernameExist = function(req, res){
	User.usernameExist(req.body.username).then(()=>{
		res.json(true)
	}).catch(()=>{
		res.json(false)
	})
}

exports.isLastnameExist = function (req, res){
	User.lastnameExist(req.body.lastname).then(() => {
		res.json(true)
	})
	.catch(() => {
		res.json(false)
	})
}

exports.isEmailExist = function(req, res){
	User.emailExist(req.body.email).then(() => res.json(true)).catch(()=> res.json(false))
}

exports.mustBeLoggedIn = function(req, res, next){
	if(req.session.user){
		next()
	}else{
		req.flash("errors", "You must be logged in to access the page")
		req.session.save(function(){
			res.redirect("/login")
		})
	}
}

exports.home = function(req, res){
	res.render("home")
}

exports.postLogin = function(req, res){
	let user = new User(req.body)
	console.log(user)
	user.login().then((result)=> {
		
		req.session.user = {
			favColor:"blue",
			email: user.data.email,
			firstname: result.firstname,
			lastname: result.lastname,
			_id: result._id,
			avatar: result.avatar
		}
		console.log(req.session.user)
		req.session.save(()=>{
			req.flash("success", result.message)
			res.redirect("/admin")
		})	
	}).catch((err) => {
		req.flash("errors", err)
		req.session.save(() =>{
			console.log(err)
			res.redirect("/login")
		})
	})
}

exports.login =  function(req, res){
	res.render("login")
}



exports.register =  function(req, res){
	res.render("register")
}

exports.admin = async function(req, res){
	if(req.session.user){
		try{
			// find the related posts for admin feed
			let posts = await Post.getFeed(req.session.user._id)
			// console.log(posts)
			res.render("admin/home-login", {posts: posts})
		} catch (err) {
			console.log(err)
			res.render("404")
		}
	}else{
		res.redirect("/login")
	}
}

exports.postRegister = async function(req, res){
	let user = new User(req.body)
	user.register().then((success)=>{
		console.log(user)
		req.flash("success", success)
		req.session.user = {
			email: user.data.email, 
			firstname: user.data.firstname, 
			lastname: user.data.lastname,
			_id: user.data._id,
			avatar: user.avatar
		}
		req.session.save(()=>{
			res.redirect("/admin")
		})
	}).catch((regErrors)=>{
		// console.log(error)
		req.flash("errors", regErrors)
	
		console.log(req.session.flash)
		req.session.save(function(){
			res.redirect("/register")
		})
	})
}
 
exports.blog = function(req, res){
	res.render("blog")
}
 
exports.gallery = function(req, res){
	res.render("gallery")
}

exports.blogList = function(req, res){
	if (req.session.user){
		res.send("you are logged in")
	}else{
		res.render("blog-list")
	}
}

exports.signOut = function(req, res){
	req.session.destroy(()=> res.redirect("/"))

}

exports.ifUserExist = function(req, res, next){
	User.findByName(req.params.firstname, req.params.lastname).then((document)=>{
		req.profileUser = document
		next()
	}).catch((err)=>{
		res.render("404")
	})
}

exports.profilePostsScreen = function(req, res){
	// ask post model to query 
	Post.findByAuthorId(req.profileUser._id).then((posts)=>{
		res.render("admin/profile-posts", {
			currentPage: "post",
			posts: posts,
			userFirstname: req.profileUser.firstname,
			userLastname: req.profileUser.lastname,
			userAvatar: req.profileUser.avatar,
			isFollowing: req.isFollowing,
			currentUser: req.currentUser,
			pageCount: {postCount: req.postCount, followerCount: req.followerCount, followingCount: req.followingCount}
		})
	}).catch()
}

exports.getFollowers = async function (req, res){
	try{
		
		let followers = await Follow.getFollowersById(req.profileUser._id)
		res.render("admin/profile-followers", {
			currentPage: "followers",
			followers: followers,
			userFirstname: req.profileUser.firstname,
			userLastname: req.profileUser.lastname,
			userAvatar: req.profileUser.avatar,
			isFollowing: req.isFollowing,
			currentUser: req.currentUser,
			pageCount: {postCount: req.postCount, followerCount: req.followerCount, followingCount: req.followingCount}
		})
	} catch {
		res.render("404")
	}
}

exports.getFollowing = async function (req, res){
	try{
		let following = await Follow.getFollowingById(req.profileUser._id)
		res.render("admin/profile-following", {
			currentPage: "following",
			following: following,
			userFirstname: req.profileUser.firstname,
			userLastname: req.profileUser.lastname,
			userAvatar: req.profileUser.avatar,
			isFollowing: req.isFollowing,
			currentUser: req.currentUser,
			pageCount: {postCount: req.postCount, followerCount: req.followerCount, followingCount: req.followingCount}
		})
		console.log(req.currentUser)
	} catch {
		res.render("404")
	}
}