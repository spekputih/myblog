const ObjectID = require("mongodb").ObjectID 
const userCollection = require("../db").db().collection("users")
const followCollection = require("../db").db().collection("follows") 
const User = require("./User")


let Follow = function(followingID, followedFirstname, followedLastname){
    this.followedFirstname =  followedFirstname
    this.followedLastname = followedLastname
    this.followingID = followingID
    this.errors = []
}

Follow.prototype.cleanUp = function(){
 if(typeof(this.followedFirstname) != "string"){this.followedFirstname = ""}
 if(typeof(this.followedLastname) != "string"){ this.followedLastname = ""}
}

Follow.prototype.validate = async function(action){

    if(this.followedFirstname == "" || this.followedLastname == ""){this.errors.push("There is an error with the username")}
    let followedUser = await userCollection.findOne({firstname: this.followedFirstname, lastname: this.followedLastname})
    if(!followedUser){
        this.errors.push("The user does not exist")
    } else{
        this.followedID = followedUser._id
    }

    if (followedUser._id == this.followingID){
        this.errors.push("You cannot follow yourself")
    }

    let isFollowAlreadyExist = await followCollection.findOne({
        followingUserID: new ObjectID(this.followingID),
        followedID: new ObjectID(this.followedID)
    })

    console.log(isFollowAlreadyExist)

    if(action == "create"){
        if (isFollowAlreadyExist){
            this.errors.push("You cannot follow the user that you already followed")
        }    
    }
    if(action == "delete"){
        if (!isFollowAlreadyExist){
            this.errors.push("You cannot stop following the user that you do not follow")
        }    
    }
}

Follow.prototype.create = function(){
    return new Promise(async (resolve, reject)=> {
        this.cleanUp()
        await this.validate("create")
        if (!this.errors.length){
           await followCollection.insertOne({
               followingUserID: new ObjectID(this.followingID),
               followedID: new ObjectID(this.followedID)
           })
           resolve()
        }else{
            reject(this.errors)
        }
    })
}

Follow.prototype.delete = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate("delete")
        if (!this.errors.length){

            await followCollection.deleteOne({
                followingUserID: new ObjectID(this.followingID),
                followedID: new ObjectID(this.followedID)
            })
            resolve()
        }else{
            reject(this.errors)
        }

    })
}
Follow.isVisitorFollowing = async function(followedID, visitorID){
    let followDoc = await followCollection.findOne({followedID: new ObjectID(followedID), followingUserID: new ObjectID(visitorID)})
	if (followDoc){
		return true
	}else{
		return false
	}
}

Follow.getFollowersById = function(id){
    return new Promise(async (resolve, reject) =>{
        try{
            let followers = await followCollection.aggregate([
                {$match: {followedID: id}},
                {$lookup: {from: "users", localField: "followingUserID", foreignField: "_id", as: "userDoc"}},
                {$project: {
                    firstname: {$arrayElemAt: ["$userDoc.firstname", 0]},
                    lastname: {$arrayElemAt: ["$userDoc.lastname", 0]},
                    email: {$arrayElemAt: ["$userDoc.email", 0]}
                }}

            ]).toArray()
            followers = followers.map(function(follower){
                // create a user
                let user = new User(follower, true)
                return {firstname: follower.firstname, lastname: follower.lastname, avatar: user.avatar}
            })
            resolve(followers)
        } catch (err) {

            console.log(err)
            reject()
        }
     })
}

Follow.getFollowingById = function(id){
    return new Promise(async (resolve, reject) => {
        try{

        
        let following = await followCollection.aggregate([
            {$match: {followingUserID: id}},
            {$lookup: {
                from: "users",
                localField: "followedID",
                foreignField: "_id",
                as: "userDoc" 
            }},
            {$project: {
                firstname: {$arrayElemAt: ["$userDoc.firstname", 0]},
                lastname: {$arrayElemAt: ["$userDoc.lastname", 0]},
                email: {$arrayElemAt: ["$userDoc.email", 0]}
            }}
        ]).toArray()

        following = following.map((follow) => {
            let user = new User(follow, true)
            console.log(user)
            return {firstname: follow.firstname, lastname: follow.lastname, avatar: user.avatar}
        })
        console.log(following)

        resolve(following)
        } catch (errors) {
            console.log(errors)
            reject(errors)
        }
    })
}

Follow.countFollowerById = function(id){
	return new Promise(async (resolve, reject) => {
		let followerCount = await followCollection.countDocuments({followedID: id})
		resolve(followerCount)
	})
}

Follow.countFollowingById = function(id){
	return new Promise(async (resolve, reject) => {
		let followingCount = await followCollection.countDocuments({followingUserID: id})
		resolve(followingCount)
	})
}


module.exports = Follow