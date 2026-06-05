const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl', 'utf8');

const regex = /"TargetContent":\s*"(.*?)ai-chat-float-wrapper/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('--- FOUND MATCH ---');
  const start = Math.max(0, match.index - 500);
  const end = Math.min(content.length, match.index + 2000);
  console.log(content.substring(start, end));
  break; // just print the first one
}
