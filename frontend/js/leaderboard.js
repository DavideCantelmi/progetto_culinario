import { apiCall } from './api.js';

const loadLeaderboard = async () => {
  try {
    const leaderboard = await apiCall('/leaderboard', 'GET', null, localStorage.getItem('token'));
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = leaderboard
      .map(
        (user, index) => `
          <div class="d-flex justify-content-between align-items-center border p-3 mb-2">
            <div>
              <span class="badge bg-primary me-2">${index + 1}</span>
              <strong>${user.nickname}</strong>
            </div>
            <div>
              <span>${user.points} punti</span>
              <span class="badge bg-success ms-2">${user.badge || 'Nessun badge'}</span>
            </div>
          </div>`
      )
      .join('');
  } catch (error) {
    alert('Errore durante il caricamento della classifica: ' + error.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadLeaderboard();
});
