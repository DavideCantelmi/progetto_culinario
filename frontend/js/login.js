import { login } from './auth.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await login(email, password);
    alert('Login effettuato con successo!');
    window.location.href = '../dashboard.html';
  } catch (error) {
    alert('Errore durante il login: ' + error.message);
  }
});
