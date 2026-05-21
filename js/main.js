// Main JavaScript logic: Theme toggle, Mobile Menu, Typing effect, EmailJS

document.addEventListener('DOMContentLoaded', () => {
  
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  
  // Check local storage for theme
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Navbar Scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = 'var(--glass-shadow)';
    } else {
      navbar.style.padding = '1.5rem 0';
      navbar.style.boxShadow = 'none';
    }
  });

  // Simple Typing Effect
  const phrases = ["Web Developer.", "MERN Stack Developer.", "DevOps Engineer."];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById("typed-text");

  function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before start
    }
    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
});

// Email JS Function
function sendEmail(e) {
  e.preventDefault();
  
  const statusEl = document.getElementById("form-status");
  statusEl.textContent = "Sending...";
  statusEl.style.color = "var(--text-secondary)";
  const btn = document.getElementById("sendMessageButton");
  btn.disabled = true;

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var data = {
    service_id: "service_ix39fsj",
    template_id: "template_njzhrgh",
    user_id: "9gytK-bzOmUaIOSae",
    template_params: {
      name,
      email,
      subject,
      message,
    },
    accessToken: "_3wY6hvcMTeSGF0Zbja3h",
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        statusEl.textContent = "Message sent successfully!";
        statusEl.style.color = "#10b981"; // green
        document.getElementById("contactForm").reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      statusEl.textContent = "Failed to send message. Please try again.";
      statusEl.style.color = "#ef4444"; // red
    })
    .finally(() => {
      btn.disabled = false;
      setTimeout(() => {
        statusEl.textContent = "";
      }, 5000);
    });
}
window.sendEmail = sendEmail;
