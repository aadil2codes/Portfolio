const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('.ai-chat-send-btn {')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
