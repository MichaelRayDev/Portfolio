// ---------- Mobile Menu Toggle ----------
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Typewriter Effect ----------
const roleData = [
  {
    role: "Front-End Developer",
    desc: "Self‑taught in HTML, CSS, and JavaScript. I craft responsive, beautiful interfaces with clean code and attention to detail."
  },
  {
    role: "Customer Success Specialist",
    desc: "3+ years of experience in remote and in-person customer support. I solve problems with empathy, listen actively, and build lasting relationships."
  },
  {
    role: "Problem Solver",
    desc: "I thrive on challenges—breaking down complex problems into elegant solutions. Creative thinking meets technical skill."
  },
  {
    role: "Marketing & Sales Strategist",
    desc: "Experienced in brand messaging, customer engagement, and driving business growth through thoughtful communication."
  }
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');
const subtitleEl = document.getElementById('hero-subtitle');

function updateSubtitle() {
  if (subtitleEl) {
    subtitleEl.textContent = roleData[wordIndex].desc;
  }
}

function typeLoop() {
  const currentWord = roleData[wordIndex].role;
  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    // Pause at end
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % roleData.length;
    updateSubtitle();
  }

  const speed = isDeleting ? 80 : 100;
  setTimeout(typeLoop, speed);
}

updateSubtitle();
typeLoop();

// ---------- Dark/Light Mode Toggle ----------
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------- Scroll Reveal ----------
const revealElements = document.querySelectorAll('.reveal');
function checkReveal() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// ---------- Contact Form Validation ----------
const form = document.querySelector('.contact-form');
const feedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

form.addEventListener('submit', (e) => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    e.preventDefault();
    feedback.textContent = 'Please fill in all fields.';
    feedback.style.color = '#ef4444';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    e.preventDefault();
    feedback.textContent = 'Please enter a valid email.';
    feedback.style.color = '#ef4444';
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  feedback.textContent = 'Sending…';
  feedback.style.color = 'var(--text)';
  
  // Reset after a reasonable time
  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    feedback.textContent = 'Message sent! I\'ll get back to you soon.';
    feedback.style.color = '#16a34a';
    form.reset();
    
    // Clear feedback after 5 seconds
    setTimeout(() => {
      feedback.textContent = '';
    }, 5000);
  }, 2000);
});

// Check for success message after Netlify redirect
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  const fb = document.getElementById('form-feedback');
  if (fb) {
    fb.textContent = 'Message sent! I’ll get back to you soon.';
    fb.style.color = '#16a34a';
  }
}