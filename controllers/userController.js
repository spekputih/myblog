const User = require("../models/User")
const Post = require("../models/Post")
const usersCollection = require("../db").db().collection("users")

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

exports.admin = function(req, res){
	
	if(req.session.user){
		usersCollection.findOne({email: req.session.user.email}).then((result)=>{
			res.render("admin/home-login")
		}).catch(err =>{
			console.log(err)
		})
		
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
	console.log(req.params.firstname + req.params.lastname)
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
			posts: posts,
			userFirstname: req.profileUser.firstname,
			userLastname: req.profileUser.lastname,
			userAvatar: req.profileUser.avatar
		})
	}).catch()
}