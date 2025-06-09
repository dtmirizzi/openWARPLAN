// Replace with your Firebase project's configuration object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// DOM Elements
// Login Page Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const googleLoginBtn = document.getElementById('google-login-btn');

// Dashboard Page Elements
const logoutBtn = document.getElementById('logout-btn');

// --- Authentication Logic ---

// Sign Up with Email and Password
if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        if (!email || !password) {
            alert('Please enter email and password.');
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up
                console.log('User signed up:', userCredential.user);
                // Redirect is handled by onAuthStateChanged
            })
            .catch((error) => {
                console.error('Sign up error:', error);
                alert('Error signing up: ' + error.message);
            });
    });
}

// Login with Email and Password
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        if (!email || !password) {
            alert('Please enter email and password.');
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log('User logged in:', userCredential.user);
                // Redirect is handled by onAuthStateChanged
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Error logging in: ' + error.message);
            });
    });
}

// Sign in with Google
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log('Google sign in successful:', result.user);
                // Redirect is handled by onAuthStateChanged
            }).catch((error) => {
                console.error('Google sign in error:', error);
                alert('Error with Google sign in: ' + error.message);
            });
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log('User logged out');
            // Redirect is handled by onAuthStateChanged
        }).catch((error) => {
            console.error('Logout error:', error);
            alert('Error logging out: ' + error.message);
        });
    });
}

// --- Auth State Observer ---
auth.onAuthStateChanged((user) => {
    const currentPage = window.location.pathname.split('/').pop();

    if (user) {
        // User is signed in.
        console.log('Auth state changed: User is logged in', user.uid);
        // If on login page (index.html or empty path), redirect to dashboard
        if (currentPage === 'index.html' || currentPage === '') {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is signed out.
        console.log('Auth state changed: User is logged out');
        // If on dashboard page, redirect to login page
        if (currentPage === 'dashboard.html') {
            window.location.href = 'index.html';
        }
    }
});
