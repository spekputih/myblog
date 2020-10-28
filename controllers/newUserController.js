const newUser = require("../models/newUser")

exports.home = function(req, res){
    if(req.session.user){
        res.render("index")
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