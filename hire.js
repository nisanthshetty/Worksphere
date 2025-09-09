//hire.js
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  onAuthStateChanged
} from './firebase-config.js';

const listContainer = document.getElementById("freelancer-list");

// Function to display freelancers
function displayFreelancers(freelancers) {
  listContainer.innerHTML = ""; // Clear previous content

  if (freelancers.length === 0) {
    listContainer.innerHTML = "<p>No freelancers available at the moment.</p>";
    return;
  }

  freelancers.forEach(freelancer => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${freelancer.name || 'Freelancer'}</h3>
      <p><strong>Email:</strong> ${freelancer.email || 'No email provided'}</p>
      ${freelancer.skills ? `<p><strong>Skills:</strong> ${Array.isArray(freelancer.skills) ? freelancer.skills.join(', ') : freelancer.skills}</p>` : ''}
      ${freelancer.bio ? `<p><strong>Bio:</strong> ${freelancer.bio}</p>` : ''}
      ${freelancer.hourlyRate ? `<p><strong>Rate:</strong> $${freelancer.hourlyRate}/hour</p>` : ''}
      <button class="contact-btn" data-id="${freelancer.id}" data-name="${freelancer.name}" data-email="${freelancer.email}">Hire Me</button>
    `;

    listContainer.appendChild(card);
  });

  // Attach click event to all "Hire Me" buttons
  document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const freelancerId = e.target.getAttribute('data-id');
      const freelancerName = e.target.getAttribute('data-name');
      const freelancerEmail = e.target.getAttribute('data-email');

      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to hire a freelancer.");
        return;
      }

      try {
        await addDoc(collection(db, "notifications"), {
          toUserId: freelancerId,
          toEmail: freelancerEmail,
          freelancerName: freelancerName || "Freelancer",
          fromUserId: user.uid,
          fromEmail: user.email,
          type: "hire-request",
          message: `${user.email} wants to hire you.`,
          timestamp: Timestamp.now()
        });

        alert("Hire request sent successfully!");
      } catch (err) {
        console.error("Error sending hire request:", err);
        alert("Failed to send hire request. Please try again.");
      }
    });
  });
}

// Load only freelancers
async function loadFreelancers() {
  try {
    listContainer.innerHTML = "<p>Loading freelancers...</p>";

    const freelancersQuery = query(
      collection(db, "users"),
      where("role", "==", "freelancer")
    );

    const querySnapshot = await getDocs(freelancersQuery);
    const freelancers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    displayFreelancers(freelancers);

  } catch (error) {
    console.error("Error loading freelancers:", error);
    listContainer.innerHTML = `
      <div style="color: red; padding: 10px; border: 1px solid #ffcccc; background: #fff0f0;">
        Error loading freelancers: ${error.message}
      </div>
    `;
  }
}

// Start loading when page loads
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadFreelancers();
    } else {
      listContainer.innerHTML = "<p>Please log in to view and hire freelancers.</p>";
    }
  });
});
