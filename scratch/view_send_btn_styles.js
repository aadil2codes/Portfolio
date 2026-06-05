const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');

const regex = /\.ai-chat-send-btn[\s\S]*?\}/g;
let match;
console.log('--- ai-chat-send-btn styles ---');
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}
