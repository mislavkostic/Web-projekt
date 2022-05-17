import { auth } from './firebase.js'
import { db } from './firebase.js'
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

let profilePicture = document.querySelector('img')
let inputPicture = document.querySelector('input')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')

onAuthStateChanged(auth, (user) => {
    if (user) {
        //Logged in...
        console.log(user)
        const names = user.displayName.split(" ")
        firstName.innerHTML = names[0]
        lastName.innerHTML = names[1]
        email.innerHTML = user.email
    } else {
        //Logged out...
    }
});

inputPicture.addEventListener('change', (e) => {
    profilePicture.src = URL.createObjectURL(e.target.files[0])
})
const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
        location.replace("../html/login.html")
    }).catch((error) => {
        alert(error.message)
    });
})