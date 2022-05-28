        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
        import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

        const firebaseConfig = {

            apiKey: "AIzaSyAmwaGyDxkTXUq0BROFDWx1MR2JCtNhDK4",

            authDomain: "bubbleschatapp.firebaseapp.com",

            projectId: "bubbleschatapp",

            storageBucket: "bubbleschatapp.appspot.com",

            messagingSenderId: "632733531985",

            appId: "1:632733531985:web:35e74453a081390e739d70",

            measurementId: "G-8HPLCJD5NF"

        };


        // Initialize Firebase

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app)
        export const db = getFirestore(app)
        export const storageDb = getStorage(app)