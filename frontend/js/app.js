import { showSection } from './ui.js';
import { login, register, logout, getToken } from './auth.js';

const toggleNavLinks = (isAuthenticated) => {
  document.getElementById('login-btn').classList.toggle('d-none', isAuthenticated);
  document.getElementById('register-btn').classList.toggle('d-none', isAuthenticated);
  document.getElementById('chat-btn').classList.toggle('d-none', !isAuthenticated);
  document.getElementById('logout-btn').classList.toggle('d-none', !isAuthenticated);
};

document.getElementById('home-btn').addEventListener('click', () => {
  showSection('home-section');
});

document.getElementById('login-btn').addEventListener('click', () => {
  showSection('login-section');
});

document.getElementById('register-btn').addEventListener('click', () => {
  showSection('register-section');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  logout();
  toggleNavLinks(false);
  showSection('home-section');
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  await login(email, password);
  toggleNavLinks(true);
  showSection('chat-section');
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nickname = document.getElementById('register-nickname').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  await register(nickname, email, password);
  alert('Registrazione completata! Esegui il login.');
});
