import {auth} from './firebase.js'
import {db} from './firebase.js'
import {createUserWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { doc, setDoc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
const firstName = document.getElementById('signup-fname')
const lastName = document.getElementById('signup-lname')
const email = document.getElementById('signup-email')
const password = document.getElementById('signup-password')
const confirmedPassword = document.getElementById('signup-cpassword')
const signupBtn = document.getElementById('signup-btn')
const signupForm = document.getElementById('signup-form')

signupForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    if(confirmedPassword.value == password.value){
        createUserWithEmailAndPassword(auth,email.value,password.value).then(() => {
            // Signed in 
            alert("Korisnik uspješno registriran")
            signupForm.reset()
            // ...
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