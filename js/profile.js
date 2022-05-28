import { auth } from './firebase.js'
import { db } from './firebase.js'
import { storageDb } from './firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

let profilePicture = document.querySelector('img')
let inputPicture = document.querySelector('input')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const logout = document.getElementById('profile-logout')

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)

        const names = user.displayName.split(" ")
        firstName.innerHTML = names[0]
        lastName.innerHTML = names[1]
        email.innerHTML = user.email
        profilePicture.src = user.photoURL //display current profile pic

        inputPicture.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const metadata = {
                contentType: file.type,
            };
            const storageRef = ref(storageDb, 'images/' + file.name);
            const usersRef = doc(db, "users", user.uid)
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            //--------------- change profile pic ---------------
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            alert("no accesss to storage")
                            break;
                        case 'storage/canceled':
                            alert("upload canceled")
                            break;
                        case 'storage/unknown':
                            alert("unknown storage error")
                            break;
                    }
                },
                () => {
                    //--------------- upload completed successfully ---------------
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateProfile(user, { photoURL: downloadURL })
                        updateDoc(usersRef, { photoURL: downloadURL })
                        profilePicture.src = downloadURL
                    }).catch((error) => {
                        alert(error.message)
                    })
                    alert("profile pic uploaded successfully")
                })
        })

        logout.addEventListener('click', (e) => {
            e.preventDefault()
            deleteDoc(doc(db, "users", user.uid)).then(() => {
                console.log("deleted: " + user.uid)
                signOut(auth).then(() => {
                    location.replace("../html/login.html")
                })
            }).catch((error) => {
                alert(error.message)
            });
        })
    }
});