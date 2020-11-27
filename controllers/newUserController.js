const newUser = require("../models/newUser")
const newUserCollection = require("../db").db().collection("user")
const chatsCollection = require("../db").db().collection("chats")
const moment = require("moment")



exports.home = async function(req, res){
    let retrieveMsg = 20

    if(req.session.user){
        let chatter1 = await chatsCollection.find({chatter1: req.session.user.username}).toArray()
        let chatter2 = await chatsCollection.find({chatter2: req.session.user.username}).toArray()
        let chatters = chatter1.concat(chatter2)
        // console.log(chatters[0].msgInfo)
        let data = chatters.map(function(data, key){
            
                let to, from, lastChat
                if(req.session.user.username === data.chatter1){
                    from = data.chatter1
                    to = data.chatter2
                }else{
                    from = data.chatter2
                    to = data.chatter1
                }
                let msg = []
                for(let i = data.msgInfo.length -1; i > data.msgInfo.length - retrieveMsg -1 ; i--){
                    if(data.msgInfo[i]){
                        msg.push(data.msgInfo[i])
                        }     
                }
                msg.sort(compareFunction)
                lastChat = data.msgInfo[data.msgInfo.length -1].timeStamp
                return {
                    id: data._id.toString(),
                    to: to,
                    from: from,
                    lastChat: lastChat,
                    LatestMsg: msg,
                }
        })
        function compareFunction(a, b){
            if(a.timeStamp > b.timeStamp){
                return 1
            }else if (a.timeStamp < b.timeStamp){
                return -1
            }
            return 0
        }
        
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