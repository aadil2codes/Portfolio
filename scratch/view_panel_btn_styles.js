const fs = require('fs');
const content = fs.readFileSync('styles.css', 'utf8');
const lines = content.split('\n');
for (let i = 3835; i < 3870; i++) {
  if (lines[i]) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}
