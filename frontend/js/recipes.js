import { apiCall } from './api.js';

const loadRecipes = async (searchTerm = '') => {
  try {
    const recipes = await apiCall(`/recipes?search=${searchTerm}`, 'GET', null, localStorage.getItem('token'));
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = recipes
      .map(
        (recipe) => `
          <div class="col-md-6 mb-4">
            <div class="card">
              <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
              <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text"><strong>Ingredienti:</strong> ${recipe.ingredients}</p>
                <p class="card-text"><strong>Procedimento:</strong> ${recipe.instructions}</p>
              </div>
            </div>
          </div>`
      )
      .join('');
  } catch (error) {
    alert('Errore durante il caricamento delle ricette: ' + error.message);
  }
};

document.getElementById('add-recipe-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('recipe-title').value;
  const ingredients = document.getElementById('recipe-ingredients').value;
  const instructions = document.getElementById('recipe-instructions').value;
  const image = document.getElementById('recipe-image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('ingredients', ingredients);
  formData.append('instructions', instructions);
  if (image) formData.append('image', image);

  try {
    await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });

    alert('Ricetta aggiunta con successo!');
    document.getElementById('add-recipe-form').reset();
    loadRecipes();
  } catch (error) {
    alert('Errore durante l\'aggiunta della ricetta: ' + error.message);
  }
});

const searchForm = document.getElementById('search-recipe-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search-recipe').value;
    loadRecipes(searchTerm);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
});
