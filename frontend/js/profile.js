import { apiCall } from './api.js';

const loadProfile = async () => {
  try {
    const profile = await apiCall('/users/profile', 'GET', null, localStorage.getItem('token'));
    document.getElementById('profile-nickname').value = profile.nickname;
    document.getElementById('profile-email').value = profile.email;
    document.getElementById('profile-preferences').value = profile.preferences || '';
  } catch (error) {
    alert('Errore durante il caricamento del profilo: ' + error.message);
  }
};

document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nickname = document.getElementById('profile-nickname').value;
  const email = document.getElementById('profile-email').value;
  const preferences = document.getElementById('profile-preferences').value;

  try {
    await apiCall('/users/profile', 'PUT', { nickname, email, preferences }, localStorage.getItem('token'));
    alert('Profilo aggiornato con successo!');
  } catch (error) {
    alert('Errore durante l\'aggiornamento del profilo: ' + error.message);
  }
});

document.addEventListener('DOMContentLoaded', loadProfile);
