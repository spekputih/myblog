const ObjectID = require("mongodb").ObjectID 
const userCollection = require("../db").db().collection("users")
const followCollection = require("../db").db().collection("follows") 


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

Follow.prototype.validate = async function(){
    let followedUser = await userCollection.findOne({firstname: this.followedFirstname, lastname: this.followedLastname})
    if(!followedUser){
        this.errors.push("The user does not exist")
    } else{
        this.followedID = followedUser._id
    }
}

Follow.prototype.create = function(){
    return new Promise(async (resolve, reject)=> {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length){
           await followCollection.insertOne({
               followingUserID: new ObjectID(this.followingID),
               followedID: this.followedID
           })
           resolve("the follows detail has been save into the database")
        }else{
            reject(this.errors)
        }
    })
}

module.exports = Follow