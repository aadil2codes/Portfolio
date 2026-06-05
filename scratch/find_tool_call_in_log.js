const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

const fileStream = fs.createReadStream(logPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('ai-chat-float-wrapper') && line.includes('replace_file_content') && line.includes('index.html')) {
    try {
      const data = JSON.parse(line);
      const toolCalls = data.tool_calls || [];
      toolCalls.forEach(tc => {
        const args = tc.arguments || tc.Arguments;
        if (args && args.ReplacementChunks) {
          const chunks = Array.isArray(args.ReplacementChunks) ? args.ReplacementChunks : JSON.parse(args.ReplacementChunks);
          chunks.forEach(chunk => {
            if (chunk.TargetContent && chunk.TargetContent.includes('ai-chat-float-wrapper')) {
              console.log('--- TARGET CONTENT ---');
              console.log(chunk.TargetContent);
              console.log('--- REPLACEMENT CONTENT ---');
              console.log(chunk.ReplacementContent);
            }
          });
        }
      });
    } catch(e) {
      // Ignored
    }
  }
});
