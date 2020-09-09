const bcrypt = require("bcrypt")
const userCollection  = require("../db").db().collection("users")
const _ = require("lodash")
const validator = require("validator")
const md5 = require("md5")
const followsCollection = require("../db").db().collection("follows")
const ObjectID = require("mongodb").ObjectID

let User = function(data, avatar){
	this.data = data
	this.errors = []
	if (avatar == undefined) {avatar = false}
	if (avatar) {this.getAvatar()}
}

User.prototype.cleanUp = function() {
	if(typeof(this.data.firstname)!= "string"){this.data.firstname = ""}
	if(typeof(this.data.lastname)!= "string"){this.data.lastname = ""}
	if(typeof(this.data.email) != "string"){this.data.email = ""}
	if(typeof(this.data.password) != "string"){this.data.password = ""}
	//clean up the bogus properties
	this.data = {
		firstname: _.capitalize(this.data.firstname.trim().toLowerCase()),
		lastname: _.capitalize(this.data.lastname.trim().toLowerCase()),
		email: this.data.email.trim().toLowerCase(),
		password: this.data.password
	}
};

User.prototype.validate = function(){
	return new Promise(async (resolve, reject) => {
	if(this.data.firstname == ""){this.errors.push("you must provide firstname")}
	if(this.data.lastname == ""){this.errors.push("you must provide lastname")}

	if(!this.data.firstname.length < 0 && !validator.isAlphanumeric(this.data.firstname)){this.errors.push("you must provide valid firstname")}
	if(!this.data.lastname.length < 0 && !validator.isAlphanumeric(this.data.lastname)){this.errors.push("you must provide valid lastname")}

	if(this.data.lastname.length > 0 && this.data.firstname.length < 3){this.errors.push("the firstname is too short, must exceed 3 characters")}
	if(this.data.lastname.length > 0 && this.data.lastname.length < 3){this.errors.push("the lastname is too short, must exceed 3 characters")}
	if(this.data.lastname.length > 0 && this.data.firstname.length > 30){this.errors.push("the firstname is too long, must not exceed 30 characters")}
	if(this.data.lastname.length > 0 && this.data.lastname.length > 30){this.errors.push("the lastname is too long, must not exceed 30 characters")}

	if(this.data.email == ""){this.errors.push("you must provide your email address")}
	if(!this.data.email.length < 0 && !validator.isEmail(this.data.email)){this.errors.push("you must provide valid email address")}

	if(this.data.password == ""){this.errors.push("you must provide your password")}
	if(this.data.password !== "" && this.data.password.length > 100){this.errors.push("the password must not exceed 100 characters")}
	if(this.data.password !== "" && this.data.password.length < 6){this.errors.push("the password must exceed 6 characters")}

	
	if(validator.isEmail(this.data.email)){
		let emailExist = await userCollection.findOne({email: this.data.email})
		console.log(emailExist)
		if (emailExist) {
			this.errors.push("The email is already exist, please give another email")
		}
	}
	resolve()

})
}

//Install package validator and require it in this file

User.prototype.register = function(){
	return new Promise(async (resolve, reject) => {
		this.cleanUp()
		await this.validate()
		console.log(this.errors)
		if(!this.errors.length){
			// hash user password
			let salt = bcrypt.genSaltSync(10)
			this.data.password = bcrypt.hashSync(this.data.password, salt)
			await userCollection.insertOne(this.data)
			this.getAvatar()
			resolve("congrates that you are already registerred in")
		}else{
			reject(this.errors)
		}
})
}

User.prototype.login = function(){
	return new Promise((resolve, reject)=>{
		this.cleanUp()
		userCollection.findOne({email: this.data.email}).then((result)=>{
			if(result && bcrypt.compareSync(this.data.password, result.password)){
				this.getAvatar()
				console.log(this.avatar)
				resolve({
					message:"you have successfully logged in ",
					firstname: result.firstname,
					lastname: result.lastname,
					_id: result._id,
					avatar: this.avatar
				})
			}else{
				reject("invalid email/password")
			}
		}).catch((err)=>{
			console.log(err)
		})
	})
}

User.prototype.getAvatar = function() {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}

User.findByName = function(firstname, lastname){
	return new Promise((resolve, reject)=>{
		if (typeof(firstname) != "string" && typeof(lastname) != "string"){
			reject()
			return
		}
		userCollection.findOne({firstname: _.capitalize(firstname), lastname: _.capitalize(lastname)}).then((result)=>{
			if (result) {
				result = new User(result, true)
				result = {
					_id: result.data._id,
					firstname: result.data.firstname,
					lastname: result.data.lastname,
					avatar: result.avatar
				}
				resolve(result)
			}else{
				reject()
			}
		}).catch((err)=>{
			reject()
		})
	})

}

User.usernameExist = function(username){
	return new Promise(async(resolve, reject)=>{
		let usernameEx = await userCollection.findOne({firstname: username})
		if(usernameEx){
			resolve()
		}else{
			reject()
		}
	})
}

User.lastnameExist = function(lastname){
	return new Promise(async (resolve, reject) => {
		let lastnameEx = await userCollection.findOne({lastname: lastname})
		console.log(lastnameEx)
		if (lastnameEx){
			resolve()
		}else{
			reject()
		}
	})
}

User.emailExist = function (email){
	return new Promise(async(resolve, reject) =>{
		let emailEx = await userCollection.findOne({email: email})
		if (emailEx){
			resolve()
		}else{
			reject()
		}
	})
}



module.exports = User