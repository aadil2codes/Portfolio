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
  if (line.includes('index.html') && (line.includes('replace_file_content') || line.includes('write_to_file'))) {
    try {
      const data = JSON.parse(line);
      console.log(`Step: ${data.step_index} | Type: ${data.type}`);
    } catch (e) {
      // Ignore
    }
  }
});
rl.on('close', () => {
  console.log('Done.');
});
