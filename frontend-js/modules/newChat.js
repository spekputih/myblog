import Noty from "./Noty"

export default class Chat {
    constructor(targetUser){
        this.openConnection()
        this.targetUser = targetUser
        this.formInput = document.querySelector(`#input-${targetUser}`)
        this.chatLog = document.querySelector(`#chatLog-${targetUser}`)
        this.chatLogBox = document.querySelector(".chat-log-box")
        this.formChat = document.querySelector(`#formChat-${targetUser}`)
        this.descriptionChannel = document.querySelector(`#description-${targetUser}`)
        this.dateChannel = document.querySelector(`#date-${targetUser}`)
        this.channelList = document.querySelector("#channel-list")
        console.log(this.formInput, this.formChat, this.chatLog)
        this.event()
    }
    // event
    event(){
        // window.onkeyup = function(e){
        //     console.log(e)
        //     if(e.key === "Enter")
        //     {
        //         e.preventDefault()
        //         console.log("Hahah")
        //     }
        // }
        this.formChat.addEventListener("submit", (e)=>{
            e.preventDefault()
            this.sendMessageToServer()
            
        })
        
    }

    // methods
    sendMessageToServer(){
        
        if(this.formInput.value != "" && this.username != this.targetUser){
            this.socket.emit("sendFromBrowser", {username: this.username, message: this.formInput.value, avatar: this.avatar, to: this.targetUser})
            console.log(this.chatLog)
            this.chatLog.insertAdjacentHTML("beforeend", `<div class="chat-log-box">
            <div class="chat-box-me">
                <p>${this.formInput.value}</p>
            </div>
            <div class="box-clear"></div>
        </div>`)
        }
        this.descriptionStatusUpdate(this.formInput.value)
        console.log(this.username)
        this.chatLog.scrollTop = this.chatLog.scrollHeight
        this.formInput.value = ""
        this.formInput.focus()
        // console.log(this.chatLog.scrollTop)
    }

    openConnection(){
        this.socket = io()
        console.log(this.socket)
		this.socket.on("welcome", data => {
			this.username = data.username
            this.avatar = data.avatar
            // console.log(data)
        })
        
		
    }
    
    descriptionStatusUpdate(message){
        
        this.descriptionChannel.innerHTML = message
        console.log("element " + this.descriptionChannel.innerHTML)
        this.dateChannel.innerHTML = `${new Date().getHours() + 1 }:${new Date().getMinutes() + 1}` 
    }

}