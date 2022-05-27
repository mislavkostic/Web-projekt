import { auth } from './firebase.js'
import { db } from './firebase.js'
import { storageDb } from './firebase.js'
import { createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { ref, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
const firstName = document.getElementById('signup-fname')
const lastName = document.getElementById('signup-lname')
const email = document.getElementById('signup-email')
const password = document.getElementById('signup-password')
const confirmedPassword = document.getElementById('signup-cpassword')
const signupBtn = document.getElementById('signup-btn')
const signupForm = document.getElementById('signup-form')

const fileName = "default-profile-pic.png"
const imagesRef = ref(storageDb, 'images')
const profilePicRef = ref(imagesRef,fileName)

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (confirmedPassword.value == password.value) {
        createUserWithEmailAndPassword(auth, email.value, password.value).then(() => {
                // Signed in 
                alert("Korisnik uspješno registriran")
                const user = auth.currentUser
                const fullName = `${firstName.value} ${lastName.value}`
                getDownloadURL(profilePicRef)
                .then((url) => {
                    updateProfile(user, {
                       photoURL : url
                    })
                }).catch((error) => {
                    alert(error.message)
                });
                updateProfile(user, {
                    displayName: fullName
                 })
                signupForm.reset()
                location.replace("../html/login.html")
            })
            .catch((error) => {
                alert(error.message)
            });
    }
    signOut(auth).then(() => {
        console.log("Odjavljen korisnik")
    }).catch((error) => {
        alert(error.message)
    });
})