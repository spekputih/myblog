//jshint esversion:6
require('dotenv').config()
// const express = require("express")
// const mongoose = require("mongoose")
// const ejs = require("ejs")
// const bodyParser = require("body-parser")
// const session = require("express-session")
// const passport = require("passport")
// const passportLocalMongoose = require("passport-local-mongoose")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate')
// const MongoStore =  require("connect-mongo")(session)
// const router = require("./router")
// const flash = require("connect-flash")
// const markdown = require("marked")

const express = require("express")
const session = require("express-session")
const router = require("./router")
const flash = require("connect-flash")
const markdown = require("marked")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const MongoStore = require("connect-mongo")(session)

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

let sessionOptions = session({
	secret: "I love you",
	store: new MongoStore({client: require("./db")}),
	resave: flash,
	saveUninitialized: false,
	cookie: { maxAge: 1000*60*60*24, httpOnly: true }
})

app.use(sessionOptions)
app.use(flash())

app.use((req, res, next) => {
	res.locals.success = req.flash("success")
	res.locals.errors = req.flash("errors")
	res.locals.user = req.session.user 
	next()
})

app.use("/", router)

// app.use(express.static("public"))
// app.use(express.json())
// app.set("view engine", "ejs")
// app.use(bodyParser.urlencoded({extended:true}))

// let sessionOptions = session({
//   secret: 'i love you',
//   store: new MongoStore({client: require("./db")}),
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 1000*60*60*24, httpOnly: true}
// })
// app.use(sessionOptions)
// app.use(flash())
// app.use(function(req, res, next){
// 	// make markdown function available in all ejs template
// 	res.locals.filterUserHTML = content => {
// 		return markdown(content)
// 	}

// 	// make all errors and success flash message are available 
// 	res.locals.errors = req.flash("errors")
// 	res.locals.success = req.flash("success")
// 	//make current user id available on the req object
// 	if (req.session.user){
// 		req.visitorID = req.session.user._id
// 	}else{
// 		req.visitorID = 0
// 	}
// 	//make user session data available from ejs view template
// 	res.locals.user = req.session.user
// 	next()
// })
// app.use('/', router)

const server = require("http").createServer(app)
const io = require("socket.io")(server)
const chatsCollection = require("./db").db().collection("chats")
io.use(function(socket, next){
	sessionOptions(socket.request, socket.request.res, next)
})
let users = {}
io.on("connection", (socket)=>{
	// console.log(socket)

	if (socket.request.session.user){
		
		let user = socket.request.session.user
		// console.log(user)
		socket.name = user.username
		users[socket.name] = socket
		// console.log(users)

		socket.emit("welcome", {username: user.username, avatar: user.avatar})
		
		socket.on("sendFromBrowser", async (data) => {
			console.log(data.to)
			// console.log(users[data.to])
			try {
				let user = await chatsCollection.findOne({username: data.username})
				console.log(user)
				if(user){
					// await chatsCollection.updateOne()
				}
				await chatsCollection.insertOne(data)
				io.to(users[data.to].emit("privateMessage", {message: data.message, from: data.username, avatar: data.avatar}))
	
			} catch (error) {
				console.log(error)
			}
			
			//socket.emit("chatMessageFromServer", {message: data.message, username: data.username, avatar: data.avatar})
		})
	}
})

module.exports = server