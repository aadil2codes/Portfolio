const fs = require('fs');
const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.log('No logs found');
  process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const searchString = 'ai-chat-panel';
let index = 0;
let matchCount = 0;

while ((index = content.indexOf(searchString, index)) !== -1) {
  matchCount++;
  console.log(`\nMatch ${matchCount}:`);
  console.log(content.substring(Math.max(0, index - 200), index + 1000));
  index += searchString.length;
  if (matchCount >= 3) break;
}
