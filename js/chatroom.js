//TODO: refactor code duplicates

let htmlBody = document.querySelector('body')

let chatTitle = document.createElement('div')
chatTitle.innerText = "Bubbles"
chatTitle.className = "chat-title"

let chatWindow = document.createElement('div')
chatWindow.className= "chat-window"

let messageBox= document.createElement('div')
messageBox.className = "message-box"
chatWindow.appendChild(messageBox)

let inputBox = document.createElement('div')
inputBox.className = "input-box"

let inputMessage = document.createElement('input')
inputMessage.type = "text"
inputMessage.placeholder = "Enter message"
inputMessage.className = "message-input"

let buttonSendMessage = document.createElement('button')
buttonSendMessage.innerText = "Send"
buttonSendMessage.addEventListener('click',() =>{
    addNewMessage()
    chatWindow.scrollTop = chatWindow.scrollHeight;
})

htmlBody.appendChild(chatTitle)
htmlBody.appendChild(chatWindow)
inputBox.appendChild(inputMessage)
inputBox.appendChild(buttonSendMessage)
htmlBody.appendChild(inputBox)

document.addEventListener('keypress',(e) =>{
    if(e.key === "Enter"){
        if(e.target.className == "message-input"){
            addNewMessage()
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }
 
})
function addNewMessage(){
    let messageDiv = document.createElement('div')
    messageDiv.className= "message-div"
    let message = document.createElement('p')
    message.className = "message-p"
    message.innerText = inputMessage.value
    if(!message.innerText){
        return
    }
    messageDiv.appendChild(message)
    messageBox.appendChild(messageDiv)
    inputMessage.value = ""
}