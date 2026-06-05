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
  if (line.includes('aiChatMessagesPanel')) {
    try {
      const data = JSON.parse(line);
      console.log(`Step: ${data.step_index}`);
      if (data.tool_calls) {
        data.tool_calls.forEach((tc, idx) => {
          console.log(`Tool call ${idx}:`, tc.name);
          console.log('Arguments:', JSON.stringify(tc.arguments || tc.Arguments, null, 2));
        });
      }
    } catch (e) {
      console.log('Line parse error:', e.message);
    }
  }
});
