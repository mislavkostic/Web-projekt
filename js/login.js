import {auth} from './firebase.js'
import {db} from './firebase.js'
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const loginForm = document.getElementById('login-form')
const email = document.getElementById('login-email')
const password = document.getElementById('login-password')

loginForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email.value, password.value).then(()=>{
        location.replace("../html/chatroom.html")
    }).catch((error) => {
        alert(error.message);
      })

})