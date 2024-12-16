import { apiCall } from './api.js';
import { getToken } from './auth.js';

export const loadRecipes = async () => {
  const recipes = await apiCall('/recipes', 'GET', null, getToken());
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = recipes.map(recipe => `<div>${recipe.title}</div>`).join('');
};

export const createRecipe = async (title) => {
  await apiCall('/recipes', 'POST', { title }, getToken());
  loadRecipes();
};
