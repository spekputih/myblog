const newUser = require("../models/newUser")
const newUserCollection = require("../db").db().collection("user")
const chatsCollection = require("../db").db().collection("chats")



exports.home = async function(req, res){
    if(req.session.user){
        let chatter1 = await chatsCollection.find({chatter1: req.session.user.username}).toArray()
        let chatter2 = await chatsCollection.find({chatter2: req.session.user.username}).toArray()
        let chatters = chatter1.concat(chatter2)
        let data = chatters.map(function(data){
            let to, from
            if(req.session.user.username === data.chatter1){
                from = data.chatter1
                to = data.chatter2
            }else{
                from = data.chatter2
                to = data.chatter1
            }
            return {
                id: data._id.toString(),
                to: to,
                from: from,
                LatestMsg: data.msgInfo,
            }
        })        
        res.render("index", {data: data})
    }else{
        res.redirect("/login")
    }
}
exports.getLogin = function(req, res){
    res.render("login")
}
exports.login = async function(req, res){
    try{
        let user = new newUser(req.body)
        let result = await user.login()
        req.session.user = {
            username: user.data.username,
            email: result.email,
            avatar: result.avatar
            
        }
        req.flash("success", "You have successfully login!")
        req.session.save(() => {
            res.redirect("/")
        })
    }catch(error){
        res.send(error)

    }
    
} 

exports.getRegister = function(req, res){
    res.render("register")
}

exports.register = async function(req, res){
    try{
        let user = new newUser(req.body)
        let result = await user.register()
        req.session.user = {
            username: user.data.username,
            email: user.data.email,
            avatar: result.avatar
        }
        req.flash("success", "You have been successfully registered")
        req.session.save(() => {
            res.redirect("/")
        })
    }catch (error){
        res.send("unsuccessfully registered " + error)
    }
}

exports.signOut = function(req, res){
	req.session.destroy(()=> res.redirect("/login"))
}