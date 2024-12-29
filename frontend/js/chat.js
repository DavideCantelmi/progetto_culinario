const socket = io('http://localhost:5000');

const messagesContainer = document.getElementById('messages-container');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

const appendMessage = (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('mb-2');
  messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const user = localStorage.getItem('username') || 'Anonimo';
  socket.emit('chatMessage', { user, message });
  messageInput.value = '';
});

socket.on('chatMessage', (data) => {
  appendMessage(data);
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chat/messages');
    const messages = await response.json();
    messages.forEach((message) => appendMessage(message));
  } catch (error) {
    console.error('Errore nel caricamento dei messaggi:', error);
  }
});
