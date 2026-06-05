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
  if (line.includes('ai-chat-float-wrapper') && line.includes('TargetContent') && (line.includes('index.html'))) {
    try {
      const data = JSON.parse(line);
      console.log('--- FOUND IN STEP:', data.step_index);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          if (tc.arguments && tc.arguments.TargetContent && tc.arguments.TargetContent.includes('ai-chat-float-wrapper')) {
            console.log('TargetContent:');
            console.log(tc.arguments.TargetContent);
          }
          if (tc.arguments && tc.arguments.ReplacementContent && tc.arguments.ReplacementContent.includes('ai-chat-float-wrapper')) {
            console.log('ReplacementContent:');
            console.log(tc.arguments.ReplacementContent);
          }
        });
      }
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  }
});
