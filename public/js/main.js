// const channels = document.querySelectorAll(".channel-information")
import Chat from "../../frontend-js/newChat"
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

console.log(modalIcon.dataset)
modalIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.add("modal-active")    
})
modalCloseIcon.addEventListener("click", () => {
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")    
})


// Start Chat 

const modalStartChat = document.getElementById("modal-start-chat")
const username = document.getElementsByClassName("modal-username")
const channelList = document.getElementById("channel-list")
const chatSection = document.getElementById("chat-section")

const channelCall = function(){
    channels.forEach((channel, key) => {
        channel.addEventListener("click", (e) => {
            let currentChannel = getCurrentChannel(channel.id)
            validateChannel(currentChannel)
        })
    })
    
    function getCurrentChannel(id) {
            return document.querySelector(`#${id}`)
        }
        
    function validateChannel(channel){
            // let chan =channel
            
            let current = channel
            let currentChat = document.getElementById(`chat-${channel.id}`)
            
            if(current != previous){
                channel.classList.add("active")
                currentChat.classList.add("show")    
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
if (prevNum === currentNum || currentNum == undefined) {
    channelCall()    
}

modalStartChat.addEventListener("click", function(){
    document.getElementById(modalIcon.dataset.id).classList.remove("modal-active")
    newUsername = username[0].value
    channelList.insertAdjacentHTML("afterbegin", 
    `<div id="${newUsername}" class="row channel-information">
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
    <div class="chat-log">
        <div class="chat-log-box">
            <div class="chat-box-me">
                <p>Assalamualaikum</p>
            </div>
            <div class="box-clear"></div>
        </div>
        
        <div class="chat-log-box">
            <div class="chat-box-other">
                <h6 class="name">Afiq Syazwan</h6>
                <p class="message">hello</p>
                
            </div>
            <div class="box-clear"></div>
        </div>
        
    </div>

<div class="align chat-input">
    <div class="input-icon">
        <i class="fas fa-smile-wink" aria-hidden="true"></i>
        <i class="fas fa-paperclip" aria-hidden="true"></i> 
    </div>
    <div class="form-message">
        <form action="">
            <input class="form-style" type="text" placeholder="type a message">
        </form>
    </div>
    <div class="input-icon mic">
        <i class="fas fa-microphone" aria-hidden="true"></i>
    </div>

</div>
</section>`)

channels = document.querySelectorAll(".channel-information")
currentNum = channels.length

    console.log(currentNum)
    username[0].value = ""
    // show = true
    
    channelCall()
    new Chat
    
    
})



    

// channel.addEventListener("click", (e)=>{
//     console.log(e)
//     // channel.classList.toggle("active")
// })