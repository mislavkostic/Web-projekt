import { auth } from './firebase.js'
import { db } from './firebase.js'
import { doc, collection, setDoc, addDoc, deleteDoc, query, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

let htmlBody = document.querySelector('body')
let userList = document.getElementById('user-list')
const logout = document.getElementById('logout')

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
            //--------------- add user to db ---------------
        setDoc(doc(db, "users", user.uid), {
            user_name: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL
        });

        //--------------- users in chat ---------------
        const users = query(collection(db, "users"));
        onSnapshot(users, (usersSnapshot) => {
            userList.innerHTML = "" //refresh connected users list
            usersSnapshot.forEach((user) => {
                let userDisplay = document.createElement('li')
                let userDiv = document.createElement('div')
                let nameUser = document.createElement('label')
                nameUser.innerHTML = user.data().user_name

                let profImg = document.createElement('img')
                profImg.style.height = "20px"
                profImg.style.width = "20px"
                profImg.src = user.data().photoURL

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
                    profileImg.src = change.doc.data().photoURL
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

                    chatWindow.scrollTop = chatWindow.scrollHeight;
                }
            });
        });
        
        //--------------- logout ---------------
        logout.addEventListener('click', (e) => {
            e.preventDefault()
            deleteDoc(doc(db, "users", user.uid)).then(() => {
                signOut(auth).then(() => {
                    location.replace("../html/login.html")
                })
            }).catch((error) => {
                alert(error.message)
            });
        })
        window.onbeforeunload = function(){ 
            deleteDoc(doc(db, "users", user.uid)).then(() => {
        }).catch((error) => {
            alert(error.message)
        }); }
    }
    else{
        location.replace("../html/login.html")
    }
});

let chatRoom = document.createElement('div')
chatRoom.className = "chat-room"
let usersDiv = document.getElementById('user-names')
chatRoom.appendChild(usersDiv)
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
        }
    }
})


function addNewMessage() {
    if (inputMessage.value == "") {
        return
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //--------------- add new message 'document' to db ---------------
            addDoc(collection(db, "messages"), {
                text: inputMessage.value,
                timestamp: Date.now(),
                user: user.displayName,
                photoURL: user.photoURL
            });
            inputMessage.value = ""
        }
    });
}