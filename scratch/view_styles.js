const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');
const lines = content.split('\n');
for (let i = 3480; i < 3540; i++) {
  if (lines[i]) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}
console.log('--- PANEL SUGGESTIONS ---');
for (let i = 3870; i < 3910; i++) {
  if (lines[i]) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}
