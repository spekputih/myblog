import Chat from "./newChat"
import publicChat from "./publicChat"
export default function(){
const chat = document.querySelector(".chat")
let previous 
let previousChat
let updatePosition = false
let socket = io()
const modalIcon = document.getElementById('envelope')
const modalCloseIcon =  document.getElementById("modalClose")
const username = document.getElementsByClassName("modal-username")
const modalForm = document.querySelector('.modal-form')
const channelList = document.getElementById("channel-list")
const chatSection = document.getElementById("chat-section")
let listNumDefault = document.querySelectorAll(".channel-information")
let currentName = []
let previousName = []
let defaultChannel = document.querySelectorAll(".channel-information")
const signOut = document.querySelector("#signout")
// console.log(socket)
// <!-- <div> <%= channel.LatestMsg[data[index].LatestMsg.length - 1].timeStamp %> </div> -->


const notification =  document.getElementsByClassName("notification")
if(document.getElementById("noty-message")){
const notyMessage = document.getElementById("noty-message")
    if(notyMessage.innerHTML != "" ){
        console.log(notyMessage.innerHTML)
        notification[0].classList.add("noty-show")
        setTimeout(() => {
            notification[0].classList.remove("noty-show")
        }, 2000)
    }
}
// modal toggle
modalIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.add("modal-active")
    username[0].focus()    
})
modalCloseIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")    
})
// Start Chat 
const channelCall = function(){
    let channels = document.querySelectorAll(".channel-information")

    let diffListNum = channels.length - listNumDefault.length
    
    if(channels.length != defaultChannel.length){
        let difference = true
        classCall(channels, difference)
    }
    console.log(channels.length, defaultChannel.length)

    channels.forEach((channel, key) => {
        
        channel.addEventListener("click", () => {
            
            let currentChannel = getCurrentChannel(channel.id)
            validateChannel(channel, key)
            status = [true, channel.id.substr(5, channel.id.length)]
                
        })
        
    })
    
    function getCurrentChannel(id) {
            return document.querySelector(`#${id}`)
        }
        
    function validateChannel(channel, key){
            
            let current = channel
            console.log("current", channel, previous)
            socket.emit("checkIfUserOnline", {user: channel.id.substr(5, channel.id.length)})
            let currentChat = document.getElementById(`chat-${channel.id.substr(5, channel.id.length)}`)
            let input = document.getElementById(`input-${channel.id.substr(5, channel.id.length)}`)
            let chatLog = document.getElementById(`chatLog-${channel.id.substr(5, channel.id.length)}`)
            if(current != previous ){
                channel.classList.add("active")

                currentChat.classList.add("show")
                
                   
                input.focus()
                chatLog.scrollTop = chatLog.scrollHeight
                if(previous && previousChat){
                    previous.classList.remove("active")
                    previousChat.classList.remove("show")
                }
                previous = current
                previousChat = currentChat
               
        
            }
            if(updatePosition && previous && previousChat){
                if(previous != current){
                previous.classList.remove("active")
                previousChat.classList.remove("show")
                updatePosition = false
            }

            }
            
            
        }
        previousName = currentName
}

function classCall(channels, difference){
    if(!difference || difference == undefined){
        channels.forEach(function(channel){
            new Chat(channel.id.substr(5, channel.id.length))
        })
    }else{
        new Chat(channels[0].id.substr(5, channels[0].id.length))
    }
}
classCall(defaultChannel, false)

// new publicChat()

let prevNum 
let currentNum
function update(){
    
    let channels = document.querySelectorAll(".channel-information")
    let show = false
    prevNum = channels.length
    if(prevNum === currentNum || currentNum == undefined){
        channelCall()
    }
    prevNum = currentNum
    

    

}
update()
function addChannelAndSection(newUsername, message){
    let description, chatBox
    if(message === undefined || message === ""){
        chatBox= ""
        description = "Private Message"
    }else{
        description = message
        chatBox = `<div class="chat-log-box">
        <div class="chat-box-other message-${newUsername}">
            <h6 class="name">${newUsername}</h6>
            <p class="message">${message}</p>                        
        </div>
        <div class="box-clear"></div>`
    }
    channelList.insertAdjacentHTML("afterbegin", 
    `<div id="list-${newUsername}" class="row channel-information active">
        <div class="icon">
            <img src="images/user.png" alt="">
        </div>
        <div class="channel-detail">
            <div class="channel-title">
                <h6 class="title">${newUsername}</h6>
                <span id="date-${newUsername}" class="time"></span>
            </div>
            <div class="channel-description">
                <p id="description-${newUsername}" class="description">${description}</p> 
                <span class="badge message-number">23</span>
            </div>
        </div>
    </div>`)

    chatSection.insertAdjacentHTML("beforeend", `<section id="chat-${newUsername}" class="align chat show">
        
    <div class="align chat-header">
        <div class="chat-profile">
            <img src="images/user.png" height="40" width="40" alt="">
        </div>
        <div class="chat-information">
        <div class="chat-title">
                <h5>${newUsername}</h5>
        </div>
        <div id="chatDescription-${newUsername}" class="chat-description">
            Type a message
        </div>
        </div>
        
        <div class="chat-icon">
            <i class="fas fa-search" aria-hidden="true"></i>
            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
            <!-- <i class="fas fa-microphone" aria-hidden="true"></i>
            <i class="fas fa-paperclip" aria-hidden="true"></i> -->

        </div>
    </div>
    <div id="chatLog-${newUsername}" class="chat-log">
        ${chatBox}
    </div>

<div class="align chat-input">
    <div class="input-icon">
        <i class="fas fa-smile-wink" aria-hidden="true"></i>
        <i class="fas fa-paperclip" aria-hidden="true"></i> 
    </div>
    <div class="form-message">
        <form id="formChat-${newUsername}" class="form-chat">
            <input id="input-${newUsername}" class="form-style" type="text" placeholder="type a message">
        </form>
    </div>
    <div class="input-icon mic">
        <i class="fas fa-microphone" aria-hidden="true"></i>
    </div>

</div>
</section>`)

}

modalForm.addEventListener("submit", function(e){
    e.preventDefault()
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")
    let newUsername = username[0].value
    if(newUsername != ""){
        addChannelAndSection(newUsername)
        let formInput = document.querySelector(`#input-${newUsername}`)
        let updateChannel = document.querySelector(`#list-${newUsername}`)
        let updateChat = document.querySelector(`#chat-${newUsername}`)
        if(previous && previousChat){
           let newPrevious = previous
           let newPreviousChat = previousChat
            newPrevious.classList.remove("active")
            newPreviousChat.classList.remove("show")
        }
        // defaultChannel.push(updateChannel)
        previousChat = updateChat
        previous = updateChannel
        updatePosition = true
        
        update()
            username[0].value = ""
            formInput.focus()
            
        }

})
}