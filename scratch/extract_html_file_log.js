const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

const fileStream = fs.createReadStream(logPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('index.html') && line.includes('739:') && line.includes('804:')) {
    try {
      const data = JSON.parse(line);
      console.log('--- FOUND DUMP ---');
      const lines = (data.content || '').split('\\n');
      lines.forEach(l => {
        const clean = l.replace(/^\s*\d+:\s*/, '').trim();
        // Just print lines between 739 and 848
        const match = l.match(/^\s*(\d+):/);
        if (match) {
          const num = parseInt(match[1]);
          if (num >= 739 && num <= 848) {
            console.log(l.replace(/^\s*\d+:\s*/, '').replace(/\r$/, ''));
          }
        }
      });
    } catch(e) {
      console.log('Error parsing:', e.message);
    }
  }
});
