export const renderUserList = (users, activeUserId, onClickUser) => {
  const userList = document.getElementById('conversation-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const userItem = document.createElement('div');
    userItem.textContent = user.nickname;
    if (user._id === activeUserId) userItem.classList.add('active');
    if (user.unread) userItem.classList.add('unread');
    userItem.addEventListener('click', () => onClickUser(user));
    userList.appendChild(userItem);
  });
};

export const renderMessages = (messages, currentUserId) => {
  const messagesContainer = document.getElementById('messages-container');
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg.content;
    messageDiv.className = msg.sender._id === currentUserId ? 'sent' : 'received';

    const timestampDiv = document.createElement('div');
    timestampDiv.textContent = new Date(msg.createdAt).toLocaleTimeString();
    timestampDiv.className = 'timestamp';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(messageDiv);
    wrapperDiv.appendChild(timestampDiv);

    messagesContainer.appendChild(wrapperDiv);
  });
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};
