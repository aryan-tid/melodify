import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8sD0CKOl0SFPtiSySzzi_MFK0tKHKIKE",
    authDomain: "melodify-fdd70.firebaseapp.com",
    projectId: "melodify-fdd70",
    storageBucket: "melodify-fdd70.firebasestorage.app",
    messagingSenderId: "672339888095",
    appId: "1:672339888095:web:b8d53151eaecf00e94266a",
    measurementId: "G-G0GJ34V70D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();

// 🔹 Login with Email & Password
window.login = async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login Successful!');
        window.location.href = "https://aryantidke.me/melodify"; // Redirect to main page
    } catch (error) {
        alert(error.message);
    }
};

// 🔹 Login with Google
window.loginWithGoogle = async function() {
    try {
        await signInWithPopup(auth, provider);
        alert('Google Login Successful!');
        window.location.href = "https://aryantidke.me/melodify"; // Redirect to main page
    } catch (error) {
        alert(error.message);
    }
};

// 🔹 Sign Up (Create New Account)
window.signup = async function() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account Created Successfully! You can now log in.');
        hideSignup();
    } catch (error) {
        alert(error.message);
    }
};

// 🔹 Forgot Password (Send Reset Email)
window.forgotPassword = async function() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email to reset password.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent! Check your inbox.');
    } catch (error) {
        alert(error.message);
    }
};

// 🔹 Auto Redirect If Already Logged In
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "https://aryantidke.me/melodify"; // Redirect to main page
    }
});

// 🔹 Show/Hide Signup Form
window.showSignup = function() {
    document.getElementById('signup-section').classList.remove('hidden');
};

window.hideSignup = function() {
    document.getElementById('signup-section').classList.add('hidden');
};
