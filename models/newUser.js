const bycrypt = require("bcrypt")
const newUserCollection = require("../db").db().collection("user")
const validator = require("validator")
const md5 = require("md5")

let newUser = function(data){
    this.data = data 
    this.errors = []
}

newUser.prototype.cleanUp = function(){
    if(typeof(this.data.username) != "string"){this.data.username = ""}
    if(typeof(this.data.email) != "string"){this.data.email = ""}
    if(typeof(this.data.password) != "string"){this.data.password = ""}
    // clean up the bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
        createdDate: new Date()
    }
}

newUser.prototype.validate = function(){
    return new Promise(async (resolve, reject) => {
        if(this.data.username == ""){this.errors.push("Please provide a username")}
        if(this.data.email == ""){this.errors.push("Please provide an email")}
        if(this.data.password == ""){this.errors.push("please enter your password")}
        if(this.data.username.length > 0 && this.data.username < 3){this.errors.push("the username must be more than three characters")}
        if(this.data.username.length > 0 && this.data.username.length > 30){this.errors.push("The username must exceed 30 characters")}
        if(this.data.username.length > 0 && !validator.isAlphanumeric(this.data.username)){this.errors.push("The username must contain only characters and numbers only")}
        if(this.data.email.length > 0 && !validator.isEmail(this.data.email)){this.errors.push("Please provide a valid email address")}

        if(validator.isEmail(this.data.email)){
            let isEmailExist = await newUserCollection.findOne({email: this.data.email})
            if(isEmailExist){this.errors.push("The email has already being used by another user. Please use another email")}
        }
        if(validator.isAlphanumeric(this.data.username) && this.data.username.length > 0){
            let isUsernameExist = await newUserCollection.findOne({username: this.data.username})
            if(isUsernameExist){this.errors.push("The username has already being used by another user. Please use another username")}
        }
        resolve()
    })
    
}

newUser.prototype.register = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate()
        try{            
            if(!this.errors.length){
                let salt = bycrypt.genSaltSync(10)
                this.data.password = bycrypt.hashSync(this.data.password, salt)
                let result = await newUserCollection.insertOne(this.data)
                if(result){
                    result.avatar = this.getAvatar()
                }
                
                resolve(result)
            }else{
                reject(this.errors)
            }
        }catch (error){
            console.log(error)
            reject()
        }
    })
}
 
newUser.prototype.login = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUp()        
        try{            
            let user = await newUserCollection.findOne({username: this.data.username})
            console.log(user)
            this.data.email = user.email
            console.log(user.email)
            if(user && bycrypt.compareSync(this.data.password, user.password)){
                this.getAvatar()
                user.avatar = this.avatar
                console.log(user)
                resolve(user)
            }else{
                reject("the password and username are not match")
            }
        }catch (err){
            console.log(err)
            reject("You have error")
        }
    })
}



newUser.prototype.getAvatar = function(){
    console.log(this.data)
    this.avatar = "https://gravatar.com/avatar/" + md5(this.data.email) + "?s=128"
}

module.exports = newUser