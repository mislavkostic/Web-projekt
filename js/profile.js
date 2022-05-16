import {auth} from './firebase.js'
import {db} from './firebase.js'
import {signOut} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

let profilePicture = document.querySelector('img')
let inputPicture = document.querySelector('input')

inputPicture.addEventListener('change',(e)=>{
    profilePicture.src = URL.createObjectURL(e.target.files[0])
})
const logout = document.getElementById('logout')
logout.addEventListener('click',(e)=>{
    e.preventDefault()
    signOut(auth).then(() => {
        location.replace("../html/login.html")
    }).catch((error) => {
      alert(error.message)
    });
})