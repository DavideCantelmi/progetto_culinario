import { register } from './auth.js';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nickname = document.getElementById('register-nickname').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  try {
    await register(nickname, email, password);
    alert('Registrazione completata con successo!');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Errore durante la registrazione: ' + error.message);
  }
});
