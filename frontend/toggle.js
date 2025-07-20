const themeBtn = document.getElementById('themeToggle');

function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
  themeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.className === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
