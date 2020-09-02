const Follow = require("../models/Follow")
const User = require("../models/User")

exports.addFollow = async function(req, res){
    let follow = new Follow(req.visitorID, req.params.firstname, req.params.lastname)
    follow.create().then((result) => {
        res.send(result)
    }).catch(err =>{
        res.send(err)
    })
}