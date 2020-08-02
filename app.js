//jshint esversion:6
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const MongoStore =  require("connect-mongo")(session)
const router = require("./router")
const flash = require("connect-flash")
const markdown = require("marked")


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express()



app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

let sessionOptions = session({
  secret: 'i love you',
  store: new MongoStore({client: require("./db")}),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24, httpOnly: true}
})
app.use(sessionOptions)
app.use(flash())
app.use(function(req, res, next){
	// make markdown function available in all ejs template
	res.locals.filterUserHTML = content => {
		return markdown(content)
	}

	// make all errors and success flash message are available 
	res.locals.errors = req.flash("errors")
	res.locals.success = req.flash("success")
	//make current user id available on the req object
	if (req.session.user){
		req.visitorID = req.session.user._id
	}else{
		req.visitorID = 0
	}
	//make user session data available from ejs view template
	res.locals.user = req.session.user
	next()
})
app.use('/', router)

const server = require("http").createServer(app)

const io = require("socket.io")(server)

io.use(function(socket, next){
	sessionOptions(socket.request, socket.request.res, next)
})

io.on("connection", (socket)=>{
	if (socket.request.session.user){
		let user = socket.request.session.user

		socket.emit("welcome", {username: user.firstname, avatar: user.avatar})
		console.log(user)
		socket.on("chatMessageFromBrowser", (data) => {
			socket.broadcast.emit("chatMessageFromServer", {message: data.message, username: user.firstname, avatar: user.avatar})
		})
	}
})

module.exports = server