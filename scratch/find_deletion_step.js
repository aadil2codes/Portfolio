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
  if (line.includes('ai-chat-panel') && line.includes('replace_file_content') && line.includes('index.html') && (line.includes('delete') || line.includes('remove') || line.includes('chat.html'))) {
    try {
      const data = JSON.parse(line);
      console.log('--- FOUND POTENTIAL DELETION TOOL CALL ---');
      console.log('Step index:', data.step_index);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          console.log('TargetContent:');
          console.log(tc.arguments.TargetContent);
          console.log('ReplacementContent:');
          console.log(tc.arguments.ReplacementContent);
        });
      }
    } catch (e) {
      // Ignore
    }
  }
});
rl.on('close', () => {
  console.log('Done.');
});
