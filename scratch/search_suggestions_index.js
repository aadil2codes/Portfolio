const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const matches = content.match(/suggestion/gi);
if (matches) {
  console.log(`Found "suggestion" in index.html ${matches.length} times.`);
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes('suggestion')) {
      console.log(`  L${index + 1}: ${line.trim()}`);
    }
  });
} else {
  console.log('No matches in index.html');
}
