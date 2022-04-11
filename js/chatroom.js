let htmlBody = document.querySelector('body')
let chatWindow = document.createElement('div')
chatWindow.className= "chat-window"
chatWindow.innerText = "Bubbles"

let messageBox= document.createElement('div')
messageBox.className = "message-box"
chatWindow.appendChild(messageBox)

let inputMessage = document.createElement('input')
inputMessage.type = "text"
inputMessage.placeholder = "Enter message"
inputMessage.className = "message-input"

let buttonSendMessage = document.createElement('button')
buttonSendMessage.innerText = "Send"
buttonSendMessage.addEventListener('click',() =>{
    addNewMessage()
})


htmlBody.appendChild(chatWindow)
htmlBody.appendChild(inputMessage)
htmlBody.appendChild(buttonSendMessage)

document.addEventListener('keypress',(e) =>{
    if(e.key === "Enter"){
        if(e.target.className == "message-input"){
            addNewMessage()
        }
    }
 
})
function addNewMessage(){
    let messageDiv = document.createElement('div')
    messageDiv.className= "message-div"
    let message = document.createElement('p')
    message.className = "message-p"
    message.innerText = inputMessage.value
    if(message.innerText == null || message.innerText == ""){
        return
    }
    messageDiv.appendChild(message)
    messageBox.appendChild(messageDiv)
    inputMessage.value = ""
}