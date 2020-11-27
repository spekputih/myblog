
const chatDB = require('../db').db().collection("chats")
const Chat = require("../models/Chat") 
// let count = 20
exports.getMessage = async function(req, res){
    let chat = new Chat(req.body.queryName)
    let messages = await chat.getMessages(req.body.count)
    // console.log(messages[0])
        res.json(messages)
    // count+=count
}