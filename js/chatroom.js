//TODO: refactor code duplicates, add collections messages, fix user list 
import { auth } from './firebase.js'
import { db } from './firebase.js'
import { doc, collection, setDoc, addDoc, deleteDoc, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

let htmlBody = document.querySelector('body')
let userList = document.getElementById('user-list')
    //let userDisplay = document.createElement('li')
    //let userDiv = document.createElement('div')
    //let profImg = document.createElement('img')
    // profImg.src = "../images/default-profile-pic.png"
    // profImg.style.height = "20px"
    // profImg.style.width = "20px"
    //let nameUser = document.createElement('label')

onAuthStateChanged(auth, (user) => {
    if (user) {
        //Logged in...
        setDoc(doc(db, "users", user.uid), {
            user_name: user.displayName
        });

        const users = query(collection(db, "users"));
        onSnapshot(users, (usersSnapshot) => {

            userList.innerHTML = ""

            usersSnapshot.forEach((user) => {

                let userDisplay = document.createElement('li')
                let userDiv = document.createElement('div')
                let nameUser = document.createElement('label')
                nameUser.innerHTML = user.data().user_name

                //img
                let profImg = document.createElement('img')
                profImg.src = "../images/default-profile-pic.png"
                profImg.style.height = "20px"
                profImg.style.width = "20px"

                userDiv.appendChild(profImg)
                userDiv.appendChild(nameUser)
                userDisplay.append(userDiv)
                userList.appendChild(userDisplay)
            });
        });
        //nameUser.innerHTML = `${user.displayName}`
        //userDiv.appendChild(profImg)
        //userDiv.appendChild(nameUser)
        //userDisplay.appendChild(userDiv)
        //userList.appendChild(userDisplay)
    } else {
        //Logged out...
    }
});
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
    let profileImg = document.createElement('img')
    profileImg.src = "../images/default-profile-pic.png"
    profileImg.style.height = "20px"
    profileImg.style.width = "20px"
    let fullName = document.createElement('label')

    let message = document.createElement('label')
    message.className = "message-p"
    message.innerText = inputMessage.value
    if (!message.innerText) {
        return
    }
    messageDiv.appendChild(profileImg)
    messageDiv.appendChild(fullName)
    messageDiv.appendChild(message)
    messageBox.appendChild(messageDiv)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            //Logged in...
            fullName.innerHTML = `${user.displayName}: `

            addDoc(collection(db, "messages"), {
                text: message.innerText,
                timestamp: Date.now(),
                user_id: user.uid,
            });
        } else {
            //Logged out...
        }
    });

    inputMessage.value = ""
}

const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    onAuthStateChanged(auth, (user) => { deleteDoc(doc(db, "users", user.uid)) });
    signOut(auth).then(() => {
        location.replace("../html/login.html")
    }).catch((error) => {
        alert(error.message)
    });
})