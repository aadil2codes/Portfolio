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
  if (line.includes('"step_index":2106,') || line.includes('"step_index":2150,')) {
    try {
      const data = JSON.parse(line);
      console.log('--- FOUND STEP:', data.step_index);
      console.log(JSON.stringify(data, null, 2).substring(0, 3000));
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  }
});
