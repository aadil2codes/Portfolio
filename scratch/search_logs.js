const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.log('Transcript file does not exist at path:', logPath);
  process.exit(1);
}

const fileStream = fs.createReadStream(logPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let matchesCount = 0;
rl.on('line', (line) => {
  if (line.includes('suggestion-chip') && line.includes('TargetContent') && matchesCount < 5) {
    matchesCount++;
    console.log(`\nMatch ${matchesCount}:`);
    // Parse the JSON line to extract relevant info
    try {
      const data = JSON.parse(line);
      console.log('Type:', data.type);
      console.log('Status:', data.status);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          if (tc.arguments && tc.arguments.TargetContent) {
            console.log('--- TARGET CONTENT ---');
            console.log(tc.arguments.TargetContent.substring(0, 1000));
          }
          if (tc.arguments && tc.arguments.ReplacementContent) {
            console.log('--- REPLACEMENT CONTENT ---');
            console.log(tc.arguments.ReplacementContent.substring(0, 1000));
          }
        });
      }
    } catch (e) {
      console.log('Error parsing JSON line:', e.message);
    }
  }
});

rl.on('close', () => {
  console.log('\nFinished reading transcript.');
});
