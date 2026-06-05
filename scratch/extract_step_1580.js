const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.log('No logs');
  process.exit(1);
}

const fileStream = fs.createReadStream(logPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('"step_index":1580,')) {
    try {
      const data = JSON.parse(line);
      console.log('--- STEP 1580 CONTENT ---');
      const lines = data.content.split('\n');
      // Print lines around the floating panel
      lines.forEach(l => {
        if (l.includes('730:') || l.includes('740:') || l.includes('750:') || l.includes('760:') || l.includes('770:') || l.includes('780:') || l.includes('790:') || l.includes('800:') || l.includes('810:') || l.includes('820:') || l.includes('830:') || l.includes('840:') || l.includes('850:')) {
          console.log(l);
        }
        // Let's print the entire range between 735 and 845
        const match = l.match(/^(\d+):/);
        if (match) {
          const lineNum = parseInt(match[1]);
          if (lineNum >= 735 && lineNum <= 845) {
            console.log(l);
          }
        }
      });
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  }
});
