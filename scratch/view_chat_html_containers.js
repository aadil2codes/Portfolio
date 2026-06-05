const fs = require('fs');
const content = fs.readFileSync('chat.html', 'utf8');

const containers = ['.chat-input-panel', '.chat-input-container', '.ai-chat-input-area'];

containers.forEach(cls => {
  const regex = new RegExp(cls.replace('.', '\\.') + '\\s*[\\s\\S]*?\\}', 'g');
  console.log(`--- ${cls} styles ---`);
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
  }
});
