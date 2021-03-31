export default class Chat {
	constructor(){
		this.chatWrapper = document.querySelector("#chat-wrapper")
		this.openIcon = document.querySelector(".header-chat-icon")
		this.injectHTML()
		this.chatField = document.querySelector("#chatField")
		this.chatLog = document.querySelector("#chat")
		this.chatForm = document.querySelector("#chatForm")
		this.openedYet = false
		this.closeIcon = document.querySelector(".chat-title-bar-close")
		this.event()
	}

	// Events
	event(){
		this.chatForm.addEventListener("submit", (e) => {
			e.preventDefault()
			this.sendMessageToServer()
		})
		
		this.openIcon.addEventListener("click", () => this.showChat())
		this.closeIcon.addEventListener("click", () => this.closeChat())
	}

	// Methods


	sendMessageToServer(){
		if(this.chatField.value != ""){
			this.socket.emit("chatMessageFromBrowser", {message: this.chatField.value})
			this.chatLog.insertAdjacentHTML("beforeend", `
			  <div class="chat-self">
		        <div class="chat-message">
		          <div class="chat-message-inner">
		            ${this.chatField.value}
		          </div>
		        </div>
		        <img class="chat-avatar avatar-tiny" src="${this.avatar}">
		      </div>
			  `)
			  this.privateMessage()
		}
		this.chatLog.scrollTop = this.chatLog.scrollHeight
		this.chatField.value = ""
		this.chatField.focus()
	}

	closeChat(){
		this.chatWrapper.classList.remove("chat--visible")
	}

	

	showChat(){
		if(!this.openedYet){
			this.openConnection()
		}
		this.openedYet = true
		this.chatWrapper.classList.add("chat--visible")
		this.chatField.focus()
	}

	privateMessage(){
		this.socket.emit("privateMessage", {message: "private message", to: "FafiqSyaz", firstname: "Afiq", lastname: "Syazwan", avatar: "https://gravatar.com/avatar/3f8bce029bfc0388361918ccd30e2ab4?s=128"})
	}

	openConnection(){
		this.socket = io()
		this.socket.on("welcome", data => {
			this.username = data.username
			this.avatar = data.avatar
		})
		this.socket.on("chatMessageFromServer", (data)=>{
			this.displayMessageFromServer(data)
		})

		this.socket.on("privateFromServer", (data) => {
			this.displayMessageFromServer(data)
			console.log(`message from ${data.firstname} ${data.lastname}: ${data.message}`)
		})
	}

	

	
	displayMessageFromServer(data){
		this.chatLog.insertAdjacentHTML("beforeend", `
				<div class="chat-other">
			        <a href="#"><img class="avatar-tiny" src="${data.avatar}"></a>
			        <div class="chat-message"><div class="chat-message-inner">
			          <a href="#"><strong>${data.username}:</strong></a>
			          ${data.message}
			        </div></div>
			    </div>
			`)
		this.chatLog.scrollTop = this.chatLog.scrollHeight
	}
	
	injectHTML(){
		this.chatWrapper.innerHTML = `
		<div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle">close</i></span></div>
		<div id="chat" class="chat-log"></div>


		<form id="chatForm" class="chat-form border-top">
	      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
	    </form>
		`
	}
}