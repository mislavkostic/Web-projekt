import { auth } from './firebase.js'
import { db } from './firebase.js'
import { storageDb } from './firebase.js'
import { doc, collection, setDoc, addDoc, deleteDoc, query, onSnapshot, getDocs, orderBy, where } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
let htmlBody = document.querySelector('body')
let userList = document.getElementById('user-list')
const profilePicRef = ref(storageDb, 'images/default-profile-pic.png')
onAuthStateChanged(auth, (user) => {
    if (user) {
        //Logged in...
        console.log(user)
        setDoc(doc(db, "users", user.uid), {
            user_name: user.displayName
        });
        //users in chat
        const users = query(collection(db, "users"));
        onSnapshot(users, (usersSnapshot) => {
            userList.innerHTML = "" //refresh connected users
            usersSnapshot.forEach((userr) => {
                let userDisplay = document.createElement('li')
                let userDiv = document.createElement('div')
                let nameUser = document.createElement('label')
                nameUser.innerHTML = userr.data().user_name

                let profImg = document.createElement('img')
                profImg.style.height = "20px"
                profImg.style.width = "20px"
                profImg.src = user.photoURL

                userDiv.appendChild(profImg)
                userDiv.appendChild(nameUser)
                userDisplay.append(userDiv)
                userList.appendChild(userDisplay)
            });
        });

        //--------------- chat messages ----------------
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        onSnapshot(q, (messages) => {
            messages.docChanges().forEach((change) => {
                if (change.type === "added") {

                    let messageDiv = document.createElement('div')
                    messageDiv.className = "message-div"

                    let profileImg = document.createElement('img')
                    profileImg.src = user.photoURL
                    profileImg.style.height = "20px"
                    profileImg.style.width = "20px"

                    let fullName = document.createElement('label')
                    fullName.innerHTML = `${change.doc.data().user}: `

                    let message = document.createElement('label')
                    message.className = "message-p"
                    message.innerText = change.doc.data().text

                    messageDiv.appendChild(profileImg)
                    messageDiv.appendChild(fullName)
                    messageDiv.appendChild(message)
                    messageBox.appendChild(messageDiv)
                }
            });
        });
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
    if (inputMessage.value == "") {
        return
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //Logged in...
            addDoc(collection(db, "messages"), {
                text: inputMessage.value,
                timestamp: Date.now(),
                user: user.displayName
            });
            inputMessage.value = ""
        }
    });
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