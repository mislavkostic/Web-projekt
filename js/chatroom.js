//TODO: refactor code duplicates
import { auth } from './firebase.js'
import { db } from './firebase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

let htmlBody = document.querySelector('body')
let chatRoom = document.createElement('div')
chatRoom.className = "chat-room"
let users = document.getElementById('user-names')
chatRoom.appendChild(users)
let chatTitle = document.createElement('div')
chatTitle.innerText = "Bubbles"
chatTitle.className = "chat-title"

let chatWindow = document.createElement('div')
chatWindow.className = "chat-window"

let messageBox = document.createElement('div')
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
buttonSendMessage.addEventListener('click', () => {
    addNewMessage()
    chatWindow.scrollTop = chatWindow.scrollHeight;
})
chatRoom.appendChild(chatWindow)
inputBox.appendChild(inputMessage)
inputBox.appendChild(buttonSendMessage)
htmlBody.appendChild(chatTitle)
htmlBody.appendChild(chatRoom)
htmlBody.appendChild(inputBox)

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        if (e.target.className == "message-input") {
            addNewMessage()
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

})

function addNewMessage() {
    let messageDiv = document.createElement('div')
    messageDiv.className = "message-div"
    let message = document.createElement('p')
    message.className = "message-p"
    message.innerText = inputMessage.value
    if (!message.innerText) {
        return
    }
    messageDiv.appendChild(message)
    messageBox.appendChild(messageDiv)
    inputMessage.value = ""
}

const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
        location.replace("../html/login.html")
    }).catch((error) => {
        alert(error.message)
    });
})