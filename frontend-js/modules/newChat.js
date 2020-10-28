export default class Chat {
    constructor(targetUser){
        this.openConnection()
        this.targetUser = targetUser
        this.formInput = document.querySelector(`#${targetUser}-input`)
        this.chatLog = document.querySelector(`#${targetUser}-chatLog`)
        this.chatLogBox = document.querySelector(".chat-log-box")
        this.formChat = document.querySelector(`#${targetUser}-formChat`)
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
        this.chatLog.scrollTop = this.chatLog.scrollHeight
        this.formInput.value = ""
        this.formInput.focus()
    }

    openConnection(){
		this.socket = io()
		this.socket.on("welcome", data => {
			this.username = data.username
            this.avatar = data.avatar
            // console.log(data)
        })
        
		this.socket.on("privateMessage", (data)=>{
			this.displayMessageFromServer(data)
		})
    }
    displayMessageFromServer(data){
        if(data.message != ""){
            this.chatLog.insertAdjacentHTML("beforeend", `<div class="chat-log-box">
            <div class="chat-box-other">
                <h6 class="name">${data.from}</h6>
                <p class="message">${data.message}</p>                        
            </div>
            <div class="box-clear"></div>`)
        }
        this.chatLog.scrollTop = this.chatLog.scrollHeight
        // console.log(data)
    }

}