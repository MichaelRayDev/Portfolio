// Dark mode toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
}

// Contact form validation
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    feedback.textContent = 'Please fill in all fields.';
    feedback.style.color = 'red';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent = 'Please enter a valid email.';
    feedback.style.color = 'red';
    return;
  }

  feedback.textContent = 'Message sent! (Demo – form not connected to backend)';
  feedback.style.color = 'green';
  form.reset();
});