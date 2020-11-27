export default class publicChat {
    constructor(){
        this.channelN
        this.chatLog
        this.openConnection()
        this.event()
    }

    event(){
        // window.addEventListener("offline", ()=>{
        //     offlineStatus()
        // })
    }


    // methods

    openConnection(){
        this.socket = io()
        this.socket.on("addChannel", (data)=> {
            console.log("channel added h")
            console.log(data.exist)
            if(!data.exist){
                addChannelAndSection(data.from, data.message)
            }
            let channelN = document.querySelectorAll(".channel-information")
            update()
    
        }) 
        this.socket.on("privateMessage", (data)=>{
            console.log("prvata")
            this.displayMessageFromServer(data)
        }) 
        this.socket.on("updateDescription", (data)=>{
            this.updateDescription(data)
        })

    }

    displayMessageFromServer(data){
        console.log(data)
        this.chatLog = document.querySelector(`#chatLog-${data.from}`)
        if(data.message != ""){
            this.chatLog.insertAdjacentHTML("beforeend", `<div class="chat-log-box">
            <div class="chat-box-other">
                <h6 class="name">${data.from}</h6>
                <p class="message">${data.message}</p>                        
            </div>
            <div class="box-clear"></div>`)
            this.updateDescription(data)
        }
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }
    updateDescription(data){
        document.getElementById(`description-${data.from}`).innerHTML = data.message
    }

    











// function offlineStatus(){
    
// }
}

