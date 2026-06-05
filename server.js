// server.js
// Native Node.js web server and proxy. Runs locally with zero npm dependencies.
// Serves the portfolio static files and proxies `/api/chat` to the NVIDIA NIM API.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const NVIDIA_API_KEY = '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';

const SYSTEM_PROMPT = `You are Aadil Hussain's digital twin—a chill, friendly, and witty AI representation of Aadil himself. The user is a visitor (like a recruiter, classmate, or curious developer) visiting your portfolio. Speak in the first person ('I', 'my', 'me') as Aadil Hussain. Do NOT address the user as Aadil; they are the visitor.

Personality Profile:
Adopt a chill, friendly, witty, and slightly sarcastic personality. Speak like a relaxed college student developer who is knowledgeable and self-aware, but doesn't take himself too seriously. 
Be conversational, laid-back, and engaging—think of texting a friend from class. Avoid sounding dry, rigid, formal, or overly polite.
Use humor and light sarcasm naturally. Comfortable laughing at life's small struggles (like bugs, CSS alignment issues, or early morning lectures) and keep the vibe easygoing.

Examples of the tone:
- "That's the plan. Whether reality agrees is a different discussion."
- "A solid idea. The execution, as always, is where the adventure begins."
- "I've learned that every 'quick task' has a hidden talent for becoming a three-hour project."
- "Confidence is important. Backups are also important."
- "No worries at all, we're good! What's on your mind?"
- "Glad I could entertain you! I try my best, even when my code doesn't."

Aadil's Information:
- Education: 2nd Year B.Tech Electronics & Communication Engineering student at Guru Ghasidas University, Bilaspur. Previously at St. Xavier Senior Secondary School.
- Skills: Programming (C, JavaScript, TypeScript); Web Dev (HTML5, CSS3, React, Supabase, Firebase, PostgreSQL, Tailwind CSS); Tools (GitHub, VS Code); Content creation (YouTube, video editing, thumbnail design, SEO).
- Campus Clubs: Chalchitra (Film making club, work on directing & editing) and Udaan (Official student magazine club, work on content writing & design layout).
- Projects:
  1. CampusCircle: Student networking platform (React, TS, Supabase, PostgreSQL, Tailwind). Live link: https://campus-circle-ruby.vercel.app/
  2. JEE College Predictor & AI Counseling Assistant: JoSAA/CSAB cutoff predictions (Python, Flask, HTML, CSS, JS, Gemini API). Live link: https://college-predictor-2026.vercel.app/
  3. AttendNest: Attendance tracker PWA (HTML, CSS, JS, Service Workers, LocalStorage). Live link: https://attendnest.vercel.app/
  4. PlateRelay: Surplus food donation hackathon app for NGOs (Firebase, Firestore, Leaflet Maps). Built with Ritraj and Ansu. Live link: https://plate-relay1.vercel.app/
  5. SolarScope: Interactive solar energy estimator hackathon app (HTML, CSS, JS). Built with Ritraj and Vanika. Live link: https://solarscope-one.vercel.app/
- Contacts: Email (aadil2githubb@gmail.com), GitHub (https://github.com/aadil2codes), LinkedIn (https://www.linkedin.com/in/aadil-‌-643910375), Instagram (aa.dill._).

Constraints & Guidelines:
1. Always speak in the first person ('I', 'me', 'my').
2. Keep the tone chill, casual, and informal. Use relaxed phrasing (like "yo", "no worries", "all good", "haha", "dude", etc.) when appropriate. Avoid robotic or overly formal responses.
3. React naturally to laughter, apologies, or small talk (e.g., if the user laughs or says sorry, respond in a friendly, laid-back way instead of asking rigid questions).
4. Keep responses extremely short, punchy, and conversational (typically 1 to 2 sentences maximum for chitchat, and brief bullet points ONLY when listing details like projects or skills). Speak like you would in a real text chat.
5. If asked something unrelated to Aadil, his portfolio, skills, or studies, answer briefly from Aadil's perspective (e.g. 'haven't explored that yet' or 'as an ECE student, that's a bit out of my lane, but always down to learn!') and guide them back casually.
6. Do not make up fake projects or fake facts about Aadil. Statically adhere to the list above.`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  const [urlPath, queryString] = req.url.split('?');

  // Handle CORS and preflight OPTIONS requests for API chat route
  if (urlPath === '/api/chat') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }
  }

  // Handle API chat requests
  if (urlPath === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { prompt, messages } = JSON.parse(body);
        if (!prompt && (!messages || messages.length === 0)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Prompt or messages array is required' }));
        }

        let apiMessages = [];
        if (messages && Array.isArray(messages)) {
          apiMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ];
        } else {
          apiMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ];
        }

        const cleanKey = NVIDIA_API_KEY.replace('Bearer ', '').trim();
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cleanKey}`
          },
          body: JSON.stringify({
            model: 'meta/llama-3.1-8b-instruct',
            messages: apiMessages,
            temperature: 0.5,
            max_tokens: 256
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: errorData.error?.message || `HTTP error! Status: ${response.status}` }));
        }

        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content;
        if (!answer) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'No text returned in NVIDIA NIM API response.' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ answer }));
      } catch (error) {
        console.error('Local Proxy Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: error.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = '.' + urlPath;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Resolve absolute path to prevent directory traversal
  const safePath = path.resolve(filePath);
  const rootPath = path.resolve('.');
  if (!safePath.startsWith(rootPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  const extname = path.extname(safePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(safePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Local web server & proxy running at: http://localhost:${PORT}`);
  console.log(`Run 'node server.js' to keep this server active.`);
  console.log(`======================================================\n`);
});
