const Follow = require("../models/Follow")
const User = require("../models/User")

exports.addFollow = async function(req, res){
    let follow = new Follow(req.visitorID, req.params.firstname, req.params.lastname)
    follow.create().then(() => {
        req.flash("success", `You have successfully followed ${req.params.firstname} ${req.params.lastname}`)
        req.session.save(()=>{
            res.redirect("/profile/" + req.params.firstname + "&" + req.params.lastname)
        })
    }).catch(errors =>{
        errors.forEach((error) => {
            req.flash("errors", error)
        })
        req.session.save(() => {
            res.redirect(`/profile/${req.params.firstname}&${req.params.lastname}`)
        })
    })
}

exports.removeFollow = async function(req, res){
    let follow = new Follow(req.visitorID, req.params.firstname, req.params.lastname)
    follow.delete().then(() => {
        req.flash("success", `You have stopped following ${req.params.firstname} ${req.params.lastname}`)
        req.session.save(()=>{
            res.redirect("/profile/" + req.params.firstname + "&" + req.params.lastname)
        })
    }).catch(err =>{
        res.render("404")
    })
}