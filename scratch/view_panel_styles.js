const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');

const index = content.indexOf('.ai-chat-panel {');
if (index !== -1) {
  console.log('Found .ai-chat-panel style in styles.css:');
  console.log(content.substring(index, index + 800));
} else {
  console.log('.ai-chat-panel not found');
}
