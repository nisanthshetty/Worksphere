import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

import {
  auth,
  db,
  googleProvider,
  facebookProvider
} from "./firebase-config.js";

// Handle Email/Password Signup
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    alert("Please select a role.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    });

    alert("Signup successful!");

    // Redirect based on role
    if (role === "client") {
      window.location.href = "home.html";
    } else {
      window.location.href = "home2.html";
    }

  } catch (error) {
    console.error("Signup error:", error);
    alert("Error: " + error.message);
  }
});

// Google Signup
document.getElementById("google-signup").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const role = prompt("Are you a 'client' or 'freelancer'?").toLowerCase();
    if (role !== "client" && role !== "freelancer") {
      alert("Invalid role. Please sign up again.");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      role,
      createdAt: new Date().toISOString()
    });

    alert("Signed up successfully with Google!");

    if (role === "client") {
      window.location.href = "home.html";
    } else {
      window.location.href = "home2.html";
    }

  } catch (error) {
    console.error("Google signup error:", error);
    alert("Error: " + error.message);
  }
});

// Facebook Signup
document.getElementById("facebook-signup").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    const role = prompt("Are you a 'client' or 'freelancer'?").toLowerCase();
    if (role !== "client" && role !== "freelancer") {
      alert("Invalid role. Please sign up again.");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      role,
      createdAt: new Date().toISOString()
    });

    alert("Signed up successfully with Facebook!");

    if (role === "client") {
      window.location.href = "home.html";
    } else {
      window.location.href = "home2.html";
    }

  } catch (error) {
    console.error("Facebook signup error:", error);
    alert("Error: " + error.message);
  }
});

// 👁️ Toggle password visibility
document.getElementById("toggle-password").addEventListener("click", () => {
  const passwordInput = document.getElementById("signup-password");
  const toggleIcon = document.getElementById("toggle-password");

  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  toggleIcon.textContent = isPasswordVisible ? "👁️" : "🙈";
});
