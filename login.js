import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

import { auth, db, googleProvider, facebookProvider } from "./firebase-config.js";

// Email/password login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔍 Fetch user role from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userType = userSnap.data().role;
      if (userType === "client") {
        window.location.href = "home.html";
      } else {
        window.location.href = "home2.html";
      }
    } else {
      alert("User role not found.");
    }
  } catch (error) {
    alert(error.message);
  }
});

// Google login
document.getElementById("google-login").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userType = userSnap.data().role;
      if (userType === "client") {
        window.location.href = "home.html";
      } else {
        window.location.href = "home2.html";
      }
    } else {
      alert("User role not found.");
    }
  } catch (error) {
    alert("Google login failed: " + error.message);
  }
});

// Facebook login
document.getElementById("facebook-login").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userType = userSnap.data().role;
      if (userType === "client") {
        window.location.href = "home.html";
      } else {
        window.location.href = "home2.html";
      }
    } else {
      alert("User role not found.");
    }
  } catch (error) {
    alert("Facebook login failed: " + error.message);
  }
});

// Password reset
document.getElementById("reset-password").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email to reset password:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  }
});

// 👁️ Toggle password visibility
document.getElementById("toggle-password").addEventListener("click", () => {
  const passwordInput = document.getElementById("login-password");
  const toggleIcon = document.getElementById("toggle-password");

  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  toggleIcon.textContent = isPasswordVisible ? "👁️" : "🙈";
});
