const chatDb = require("../db").db().collection("chats")
let ChatLog = function(queryNames){
    this.user1 = queryNames[0]
    this.user2 = queryNames[1]
}

ChatLog.prototype.getMessages = function(msgCount){
    return new Promise(async (resolve, reject)=>{
        try {
            
            let chatMessage = await chatDb.aggregate([
                {$match: {chatter1: this.user1, chatter2: this.user2}},
                {$project: {msgInfo: 1}},
            ]).toArray()
            chatMessage.msgInfo = chatMessage[0].msgInfo.sort(this.compareFunction)
            let messages = chatMessage.map((message)=>{
                let arrayMsg = []
                let numberOfMessageRetrieve = 20
                let msg = message.msgInfo
                
                for(let i = msgCount; i < msg.length && i < msgCount + numberOfMessageRetrieve; i++){
                    console.log(i, msg.length, msgCount + numberOfMessageRetrieve, msgCount, numberOfMessageRetrieve)

                    arrayMsg.push({
                        message: msg[i].message,
                        from: msg[i].from,
                        avatar: msg[i].avatar,
                        to: msg[i].to,
                        isRead: msg[i].isRead,
                        timeStamp: msg[i].timeStamp
                    })
                    
                }
                msgCount += numberOfMessageRetrieve 
                return arrayMsg
            })
            resolve(messages)
            
        } catch (error) {
            console.log(error)
        }
    })
}
ChatLog.prototype.compareFunction = function(a, b){
    if(a.timeStamp < b.timeStamp){
        return 1
    }else if (a.timeStamp > b.timeStamp){
        return -1
    }
    return 0

}

module.exports = ChatLog