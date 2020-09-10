const Post = require("../models/Post")


exports.getPost = function(req, res){
	res.render("admin/create-post")
}

exports.createPost = function(req, res){
	let post = new Post(req.body, req.session.user._id)
	post.create().then((result) => {
		res.redirect("/post/"+ result)
	}).catch(error =>{
		res.send(error)
	})
}

exports.viewSingle = async function(req, res){
	try {
		let post = await Post.findSinglePost(req.params.id, req.visitorID)
		res.render("admin/post", {post: post, id: req.params.id})
	} catch (err){
		res.render("404")
	}
}

exports.viewEditPage = async function(req, res){
	try{
		let editData = await Post.findSinglePost(req.params.id, req.visitorID)
		if (editData.isVisitorOwner){
			res.render("admin/edit-post", {editData: editData})
		}else{
			req.flash("errors", "You do not have a permission to perform that action")
			req.session.save(()=>{
				res.redirect("/admin")
			})
		}
	}catch (err){
		console.log(err)
		res.render("404")
	}
}

exports.edit = async function(req, res){
	let post = new Post(req.body, req.visitorID, req.params.id)
	post.update().then((status)=>{
		// the post was successfully updated in the database
		// or user did have permission but there were validation errors
		if(status == "success"){
			// post was updated to db
			req.flash("success", "Post successfully updated")
			req.session.save(function(){
				res.redirect(`/post/${req.params.id}`)
			})
		}else{
			post.errors.forEach(function(error){
				req.flash("errors", error)				
			})
			req.session.save(function(){
				res.redirect(`/post/${req.params.id}/edit`)
			})
		}
	}).catch(()=>{
		// a post with the requested id doesn't exist
			req.flash("errors", "your are not allowed to perform that action")
			req.session.save(function(){
				res.redirect(`/post/${req.params.id}/edit`)
			})
		// or if the current visitor is not the owner of the requested post
	})
}

exports.delete = (req, res) => {
	Post.delete(req.params.id, req.visitorID).then((result)=>{
		req.flash("success", "Successfully deleted")
		req.session.save(() => {
			res.redirect(`/profile/${result.firstname}&${result.lastname}`)
		})
	}).catch(() => {
		req.flash("errors", "You do not have permission to perform that action")
		req.session.save(()=>req.redirect("/"))

	})
}

exports.search = (req, res) => {
	console.log("searchTerm: "+ req.body.setValue)
		Post.search(req.body.setValue).then(result => {
			res.json(result)
		}).catch(()  => {
			res.json([])
		})
}