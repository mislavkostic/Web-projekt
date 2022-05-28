import { auth } from './firebase.js'
import { storageDb } from './firebase.js'
import { createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

const firstName = document.getElementById('signup-fname')
const lastName = document.getElementById('signup-lname')
const email = document.getElementById('signup-email')
const password = document.getElementById('signup-password')
const confirmedPassword = document.getElementById('signup-cpassword')
const signupForm = document.getElementById('signup-form')

const fileName = "default-profile-pic.png"
const storageRef = ref(storageDb, 'images/' + fileName);

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (confirmedPassword.value == password.value) {
        createUserWithEmailAndPassword(auth, email.value, password.value).then(() => {
            const user = auth.currentUser
            const fullName = `${firstName.value} ${lastName.value}`
            getDownloadURL(storageRef)
                .then((url) => {
                    updateProfile(user, {
                        displayName: fullName,
                        photoURL: url
                    })
                    signOut(auth).then(() => {
                        alert("Korisnik uspješno registriran")
                        signupForm.reset()
                        location.replace("../html/login.html")
                    }).catch((error) => {
                        alert(error.message)
                    });
                })
        }).catch((error) => {
            alert(error.message)
        });
    }

})