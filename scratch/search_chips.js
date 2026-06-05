const fs = require('fs');
const files = ['index.html', 'chat.html', 'styles.css', 'chat.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/suggestion-chip/gi);
    if (matches) {
      console.log(`Found "suggestion-chip" in ${file} ${matches.length} times.`);
      // Print lines containing suggestion-chip
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('suggestion-chip')) {
          console.log(`  L${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
});
