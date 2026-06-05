const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl', 'utf8');

const search = 'aiChatFloatBtn';
let index = 0;
let matchCount = 0;

while ((index = content.indexOf(search, index)) !== -1) {
  matchCount++;
  // We want to find a block of text that looks like HTML (contains <button and </div)
  const segment = content.substring(Math.max(0, index - 200), index + 1500);
  if (segment.includes('ai-chat-panel-header') || segment.includes('aiChatMessagesPanel')) {
    console.log(`\n=== MATCH ${matchCount} ===`);
    console.log(segment);
    break; // We found the HTML!
  }
  index += search.length;
}
