import { apiCall } from './api.js';

export const login = async (email, password) => {
  const data = await apiCall('/users/login', 'POST', { email, password });
  localStorage.setItem('token', data.token);
};

export const register = async (nickname, email, password) => {
  await apiCall('/users/register', 'POST', { nickname, email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');
