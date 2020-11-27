//jshint esversion:6
require('dotenv').config()

const express = require("express")
const session = require("express-session")
const router = require("./router")
const flash = require("connect-flash")
const markdown = require("marked")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const MongoStore = require("connect-mongo")(session)
const moment = require("moment")

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
	if (socket.request.session.user){
		
		let user = socket.request.session.user
		socket.name = user.username
		users[socket.name] = socket
		socket.broadcast.emit("userOnline", {status: "online", from: user.username})
		socket.emit("welcome", {username: user.username, avatar: user.avatar})

		let exist = false
		socket.on("sendFromBrowser", async (data) => {
			let chatterArray = [data.to, data.username]
			let newArray = chatterArray.sort()
			try {
				let channel = await chatsCollection.findOne({chatter1: newArray[0], chatter2: newArray[1]})
				if(channel){
					await chatsCollection.updateOne({
						chatter1: newArray[0],
						chatter2: newArray[1]
					},
						{$push: {
							msgInfo: {
								message: data.message,
								from: data.username,
								avatar: data.avatar,
								to: data.to,
								isStatus: "sending",
								timeStamp: new Date()
							}
						}
					})
					exist = true
				}else{
					dbData = {
						chatter1: newArray[0],
						chatter2: newArray[1],
						msgInfo: [{
							message: data.message,
							from: data.username,
							avatar: data.avatar,
							to: data.to,
							isStatus: 'sending',
							timeStamp: new Date() }
						]
					}
					await chatsCollection.insertOne(dbData)
					exist = false
				}
				
				if(users[data.to]){
					// console.log(data.to)
					if(!exist){
						io.to(users[data.to].emit("addChannel", {
							exist: exist,
							from: data.username,
							message: data.message
						}))
					}else{
						io.to(users[data.to].emit("updateDescription", {
							exist: exist,
							from: data.username,
							message: data.message
						}))
					}
					// io.to(users[data.to].emit("privateMessage", {
					// 	message: data.message,
					// 	from: data.username,
					// 	avatar: data.avatar
					// }))
					io.to(users[data.to].emit("privateMessageClass", {
						message: data.message,
						from: data.username,
						avatar: data.avatar}))
					
				}else{
					console.log("offline")
				}
				
			} catch (error) {
				console.log(error)
			}
			
			//socket.emit("chatMessageFromServer", {message: data.message, username: data.username, avatar: data.avatar})
		})
		socket.on("sendActivity", (data)=>{
			if(users[data.to]){
				console.log("activity", users[data.to].name)
				io.to(users[data.to].emit("sendActivityFromServer", {to: data.to, from: data.from, activity: data.activityType}))			
			}	
		})
		socket.on("sendStatusOnlineOrOffline", (data)=> {
			socket.broadcast.emit("userOnline", data)
		})
		socket.on("checkIfUserOnline", (data)=>{
			console.log(users[data.user])
			if(users[data.user]){
				socket.to(users[user.username].emit("userOnline", {status: "online", from: data.user}))			
			}else{
				socket.to(users[user.username].emit("userOnline", {status: "offline", from: data.user}))			
			}
		})
		socket.on("disconnect", (reason)=>{
			if(reason === "io server disconnect"){
				socket.connect()
			}
			socket.broadcast.emit("userOnline", {status: "offline", from: user.username})
			delete users[user.username]
		})
		socket.on("connect", ()=>{
			socket.broadcast.emit("userOnline", {status: "online", from: user.username})
		})
		
	}
})


module.exports = server