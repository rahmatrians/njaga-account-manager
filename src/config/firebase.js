// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC74-6L728RK9uEkUMZ7umVPVMsyd9dTJw",
    authDomain: "njaga-account-manager.firebaseapp.com",
    projectId: "njaga-account-manager",
    storageBucket: "njaga-account-manager.appspot.com",
    messagingSenderId: "267849509975",
    appId: "1:267849509975:web:e2c1aa88ec8ebdead9c712",
    measurementId: "G-SPSHHYHW4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore, analytics };