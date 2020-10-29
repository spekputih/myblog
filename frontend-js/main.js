import Search from "./modules/search"
import Chat from "./modules/newChat"
import RegistrationForm from "./modules/registrationForm"
// if (document.querySelector("#register-form")){new RegistrationForm()}
// if (document.querySelector("#chat-wrapper")){
// 	new Chat()
// }
// new Search()
// const channels = document.querySelectorAll(".channel-information")
// import Chat from "../../frontend-js/newChat"
const chat = document.querySelector(".chat")
let previous 
let previousChat
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
const modalIcon = document.getElementById('envelope')
const modalCloseIcon =  document.getElementById("modalClose")
const username = document.getElementsByClassName("modal-username")

console.log(modalIcon.dataset)
modalIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.add("modal-active")
    console.log(username)
    username[0].focus()    
})
modalCloseIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")    
})
// Start Chat 

const modalForm = document.querySelector('.modal-form')
const channelList = document.getElementById("channel-list")
const chatSection = document.getElementById("chat-section")

const channelCall = function(){
    channels.forEach((channel, key) => {
        channel.addEventListener("click", () => {
            let currentChannel = getCurrentChannel(channel.id)
            // console.log()
            validateChannel(channel)
                
        })
    })
    
    function getCurrentChannel(id) {
            return document.querySelector(`#${id}`)
        }
        
    function validateChannel(channel){
            // let chan =channel
            
            let current = channel
            let currentChat = document.getElementById(`chat-${channel.id.substr(5, channel.id.length)}`)
            let input = document.getElementById(`input-${channel.id.substr(5, channel.id.length)}`)
            let chatLog = document.getElementById(`chatLog-${channel.id.substr(5, channel.id.length)}`)
            
            
            
            if(current != previous){
                channel.classList.add("active")

                currentChat.classList.add("show")
                
                   
                input.focus()
                chatLog.scrollTop = chatLog.scrollHeight
                console.log(chatLog.scrollTop)
                new Chat(channel.id.substr(5, channel.id.length))
                
                 
                // chat.classList.add("show")
                if(previous && previousChat){
                    previous.classList.remove("active")
                    previousChat.classList.remove("show")
                }
                previous = current
                previousChat = currentChat
        
            }
        }
}
let prevNum 
let currentNum
let channels = document.querySelectorAll(".channel-information")
let show = false
prevNum = channels.length
console.log(prevNum)

if(prevNum === currentNum || currentNum == undefined){
    channelCall()
    
}

modalForm.addEventListener("submit", function(e){
    e.preventDefault()
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")
    let newUsername = username[0].value
    if(newUsername != ""){
    channelList.insertAdjacentHTML("afterbegin", 
    `<div id="list-${newUsername}" class="row channel-information">
        <div class="icon">
            <img src="images/user.png" alt="">
        </div>
        <div class="channel-detail">
            <div class="channel-title">
                <h6 class="title">${newUsername}</h6>
                <span class="time">11:50</span>
            </div>
            <div class="channel-description">
                <p class="description">Izzudin, Najwa, Ainul, Haziq, Syazana</p> 
                <span class="badge message-number">23</span>
            </div>
        </div>
    </div>`)

    chatSection.insertAdjacentHTML("beforeend", `<section id="chat-${newUsername}" class="align chat ${show ? ' ': 'show'}">
        
    <div class="align chat-header">
        <div class="chat-profile">
            <img src="images/user.png" height="40" width="40" alt="">
        </div>
        <div class="chat-information">
        <div class="chat-title">
                <h5>${newUsername}</h5>
        </div>
        <div class="chat-description">
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

let formInput = document.querySelector(`#input-${newUsername}`)
channels = document.querySelectorAll(".channel-information")
currentNum = channels.length
    console.log(currentNum)
    username[0].value = ""
    // show = true    
    channelCall()
    formInput.focus()
    new Chat(newUsername)
}

})



// for channel that has been already listed in the channel list section
// channel.addEventListener("click", (e)=>{
//     console.log(e)
//     // channel.classList.toggle("active")
// })