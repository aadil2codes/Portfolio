const fs = require('fs');
const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.log('No logs');
  process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const searchString = 'aiChatMessagesPanel';
let pos = 0;
while ((pos = content.indexOf(searchString, pos)) !== -1) {
  // Search backwards for the start of the replace_file_content or write_to_file call or file content
  const start = Math.max(0, pos - 2000);
  const end = Math.min(content.length, pos + 4000);
  console.log('--- MATCH ---');
  console.log(content.substring(start, end));
  pos += searchString.length;
  break; // Just print one matching diff block
}
