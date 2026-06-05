const fs = require('fs');
const logPath = 'C:\\Users\\Hp\\.gemini\\antigravity\\brain\\bb1b507d-6c2d-498d-8968-b7901ef33c88\\.system_generated\\logs\\transcript.jsonl';

const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');
lines.forEach(line => {
  if (line.includes('"step_index":2208,')) {
    try {
      const data = JSON.parse(line);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          const args = tc.arguments || tc.Arguments;
          console.log('Keys of args:', Object.keys(args));
          console.log('ReplacementChunks Type:', typeof args.ReplacementChunks);
          const chunks = Array.isArray(args.ReplacementChunks) ? args.ReplacementChunks : JSON.parse(args.ReplacementChunks);
          chunks.forEach((chunk, i) => {
            console.log(`Chunk ${i+1}:`);
            console.log('TargetContent:\n', chunk.TargetContent);
            console.log('ReplacementContent:\n', chunk.ReplacementContent);
            console.log('====================================');
          });
        });
      }
    } catch (e) {
      console.log('Error parsing chunk:', e.message);
    }
  }
});
