        // TODO promjeniti na cloud firestore umjesto database te dodati funkcionalnosti
        
        // Import the functions you need from the SDKs you need

        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
        import { getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use

        // https://firebase.google.com/docs/web/setup#available-libraries


        // Your web app's Firebase configuration

        // For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
        const analytics = getAnalytics(app);
        export const auth = getAuth(app)
        export const db = getFirestore(app)
