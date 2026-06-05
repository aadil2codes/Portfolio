const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');

const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('panel-icon-btn') || line.includes('close-panel-btn')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
