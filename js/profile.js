import { auth } from './firebase.js'
import { db } from './firebase.js'
import { storageDb } from './firebase.js'
import { ref,uploadBytesResumable,getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
let profilePicture = document.querySelector('img')
let inputPicture = document.querySelector('input')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
//TODO photoURL 
onAuthStateChanged(auth, (user) => {
    if (user) {
        //Logged in...
        const names = user.displayName.split(" ")
        firstName.innerHTML = names[0]
        lastName.innerHTML = names[1]
        email.innerHTML = user.email

        inputPicture.addEventListener('change', (e) => {
            // profilePicture.src = URL.createObjectURL(e.target.files[0])
            const file = e.target.files[0];
            const name = file.name;
            const metadata = {
              contentType: file.type,
            };
            const storageRef = ref(storageDb,'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        
            alert("Pričekajte nekoliko trenutaka učitavanje slike profila.");
            uploadTask.on("state_changed",() => 
                
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(user,{ photoURL: downloadURL})
                    profilePicture.src= downloadURL
                    //TODO dodati file name u usere (update) lokalno
                }))

        })
    } else {
        //Logged out...
    }
});

const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
        location.replace("../html/login.html")
    }).catch((error) => {
        alert(error.message)
    });
})