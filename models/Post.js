const postCollection = require("../db").db().collection("posts")
const followCollection = require("../db").db().collection("follows")
const validator = require("validator")
const _ = require("lodash")
const ObjectID = require("mongodb").ObjectID
const User = require("./User")
const sanitizeHTML = require("sanitize-html")

let Post = function(data, userid, requestedPostId){
	this.data = data,
	this.userid = userid,
	this.errors = [],
	this.requestedPostId = requestedPostId
}

Post.prototype.cleanUp = function(){
	if (typeof(this.data.title) != "string") {this.data.title = ""}
	if (typeof(this.data.body) != "string") {this.data.body = ""}

	// remove bogus information
	this.data = {
		title: sanitizeHTML(this.data.title.trim(), {allowedTags: [], allowedAttributes: {}}),
		body: sanitizeHTML(this.data.body.trim(), {allowedTags: [], allowedAttributes: {}}),
		createdDate: new Date(),
		author: ObjectID(this.userid)
	}
	console.log(this.data)
}

Post.prototype.validate = function(){
	if (this.data.title == "") {this.errors.push("You must provide a title")}
	if (this.data.body == "") {this.errors.push("You must provide a body content")}

}

Post.prototype.create = function(){
	return new Promise((resolve, reject)=>{

		this.validate()
		
		this.cleanUp()
		if (!this.errors.length) {
			//save post into database
			
			postCollection.insertOne(this.data).then((result)=>{
				resolve(result.ops[0]._id)
			}).catch(()=>{
				this.errors.push("please try again later")
				reject(this.errors)
			})

		} else {
			this.errors.push("The data is not valid")
			
			reject(this.errors)

		}
	
	})
	
}

Post.prototype.update = function(){
	return new Promise(async (resolve, reject)=>{
		try{

			let post = await Post.findSinglePost(this.requestedPostId, this.userid)
			if (post.isVisitorOwner){
				// actually update the db
				let status = await this.actuallyUpdate()
				resolve(status)
			}else{
				reject()
			}
		}catch{
			reject()
		}
	})
}

Post.prototype.actuallyUpdate = function(){
	return new Promise(async (resolve, reject)=>{
		this.cleanUp()
		this.validate()
		if(!this.errors.length){
			await postCollection.findOneAndUpdate({_id: new ObjectID(this.requestedPostId)}, {$set: {title: this.data.title, body: this.data.body}})
			resolve("success")
		}else{
			reject("reject")
		}
	})
}

Post.reusablePostQuery = function(uniqueOperation, id){
	return new Promise(async function(resolve, reject){
		let aggOperation = uniqueOperation.concat([
				{$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}},
				{$project: {
					title: 1,
					body: 1,
					createdDate: 1,
					authorId: "$author",
					author: {$arrayElemAt: ["$authorDocument", 0]}
				}}
			])
		let posts = await postCollection.aggregate(aggOperation).toArray()

		//clean up author property in each post object
		posts = posts.map(function(post){
			//******* post.isVisitorOwner will hold "true" or "false" value
			//******* .equals method check for equality of the visitorID 
			//******* in the req object with the original authorID for the post
			post.isVisitorOwner = post.authorId.equals(id)
			post.author = {
				firstname: post.author.firstname,
				lastname: post.author.lastname,
				avatar: new User(post.author, true).avatar
			}
			return post
		})

		resolve(posts)
	})
}


Post.findSinglePost = function(id, visitorID){
	return new Promise(async function(resolve, reject){
		if (typeof(id) != "string" || !ObjectID.isValid(id)){
			reject()
			return
		}

		let posts = await Post.reusablePostQuery([
				{$match: {_id: new ObjectID(id)}}
			], visitorID)
		

		if (posts.length){
			resolve(posts[0])
		} else {
			reject()
		}
	})
}

Post.findByAuthorId = function(id){
	return Post.reusablePostQuery([
			{$match: {author: id}},
			{$sort: {createdDate: -1}}
		])

}

Post.delete = (postID, visitorID) => {
		return new Promise(async (resolve,reject)=>{
			try{
				let post = await Post.findSinglePost(postID, visitorID)
				if(post.isVisitorOwner){
					await postCollection.deleteOne({_id: new ObjectID(postID)})

					resolve(post.author)
				}else{
					reject()
				}
			}catch{
				reject()
			}
		})
}

Post.search = (searchTerm) => {
	return new Promise(async (resolve, reject) => {
		if (typeof(searchTerm) == "string"){
			let posts = await Post.reusablePostQuery([
					{$match: {$text: {$search: searchTerm}}},
					{$sort: {score: {$meta: "textScore"}}}
				])
			resolve(posts)
			console.log(posts)
		}else{
			reject()
		}
	})
}
Post.countPostsByAuthor = function(id){
	return new Promise(async (resolve, reject) => {
		let postCount = await postCollection.countDocuments({author: id})
		resolve(postCount)
	})
}

Post.getFeed = function(id){
	return new Promise(async (resolve, reject) => {
		// create an array of the user ids that the current user follow
		try{
			let followedId = await followCollection.find({followingUserID: new ObjectID(id)}).toArray()
			// adjust the arrays which consist of followed user ids only
			followedId = followedId.map((follow) => {
				return follow.followedID
			})

			console.log(followedId)

			// look for posts where the author is in the above array of followed users
			let posts = await Post.reusablePostQuery([
				{$match: {author: {$in: followedId}}},
				{$sort: {createdDate: -1}}
			])
			console.log(posts)
			resolve(posts) 
		} catch (err) {
			console.log(err)
			reject()
		}
	})
	
}



module.exports = Post