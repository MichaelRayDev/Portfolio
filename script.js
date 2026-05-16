// ---------- Typewriter Effect ----------
const words = ["Front-End Developer", "Customer Success Specialist", "Problem Solver", "Calm Voice on a Bad Day"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeLoop() {
  const currentWord = words[wordIndex];
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
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 50 : 100;
  setTimeout(typeLoop, speed);
}
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
  feedback.textContent = 'Sending…';
  feedback.style.color = 'var(--text)';
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