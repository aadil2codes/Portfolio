const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');
const searchClasses = ['.ai-chat-panel', '.ai-chat-float-btn', 'closeChatPanelBtn', 'aiChatInputAreaPanel', 'aiChatMessagesPanel'];

searchClasses.forEach(cls => {
  const match = content.includes(cls);
  console.log(`Class/Id "${cls}" exists in styles.css: ${match}`);
});
