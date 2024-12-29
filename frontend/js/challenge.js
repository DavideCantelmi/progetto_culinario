import { apiCall } from './api.js';

const loadChallenges = async () => {
  try {
    const challenges = await apiCall('/challenges', 'GET', null, localStorage.getItem('token'));
    const challengeList = document.getElementById('challenge-list');
    challengeList.innerHTML = challenges
      .map(
        (challenge) => `
          <div class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${challenge.title}</h5>
                <p class="card-text">${challenge.description}</p>
                <p><strong>Scadenza:</strong> ${new Date(challenge.deadline).toLocaleDateString()}</p>
                <button class="btn btn-primary participate-btn" data-id="${challenge._id}">Partecipa</button>
              </div>
            </div>
          </div>`
      )
      .join('');
    attachParticipationHandlers();
  } catch (error) {
    alert('Errore durante il caricamento delle sfide: ' + error.message);
  }
};

const attachParticipationHandlers = () => {
  document.querySelectorAll('.participate-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const challengeId = button.getAttribute('data-id');
      await participateInChallenge(challengeId);
    });
  });
};

const participateInChallenge = async (challengeId) => {
  try {
    const recipe = prompt('Inserisci la tua ricetta per partecipare alla sfida:');
    if (!recipe) return;

    await apiCall(`/challenges/${challengeId}/participate`, 'POST', { recipe }, localStorage.getItem('token'));
    alert('Partecipazione avvenuta con successo!');
  } catch (error) {
    alert('Errore durante la partecipazione alla sfida: ' + error.message);
  }
};

const voteForChallenge = async (challengeId) => {
  try {
    const recipeId = prompt('Inserisci l\'ID della ricetta che vuoi votare:');
    if (!recipeId) return;

    await apiCall(`/challenges/${challengeId}/vote`, 'POST', { recipeId }, localStorage.getItem('token'));
    alert('Voto registrato con successo!');
  } catch (error) {
    alert('Errore durante la votazione: ' + error.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadChallenges();
});
