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
  if (line.includes('index.html') && line.includes('replace_file_content')) {
    try {
      const data = JSON.parse(line);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          if (tc.arguments && tc.arguments.TargetContent && (tc.arguments.TargetContent.includes('ai-chat-panel') || tc.arguments.TargetContent.includes('ai-chat-float-wrapper'))) {
            console.log(`Step: ${data.step_index}`);
            console.log('TargetContent:', tc.arguments.TargetContent.substring(0, 300));
            console.log('ReplacementContent:', tc.arguments.ReplacementContent.substring(0, 300));
            console.log('----------------------------------------------------');
          }
        });
      }
    } catch (e) {
      // Ignored
    }
  }
});
