const fs = require('fs');
const content = fs.readFileSync('chat.html', 'utf8');

const regexSuggestions = /\.chat-suggestions-row[\s\S]*?\}/g;
const regexChip = /\.suggestion-chip[\s\S]*?\}/g;

console.log('--- chat-suggestions-row styles ---');
let match;
while ((match = regexSuggestions.exec(content)) !== null) {
  console.log(match[0]);
}

console.log('--- suggestion-chip styles ---');
while ((match = regexChip.exec(content)) !== null) {
  console.log(match[0]);
}
