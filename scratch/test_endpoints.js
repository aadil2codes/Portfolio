const http = require('http');

const urls = [
  'http://localhost:3000/chat.html',
  'http://localhost:3000/index.html',
  'http://localhost:3000/chat.js',
  'http://localhost:3000/styles.css'
];

urls.forEach(url => {
  http.get(url, (res) => {
    console.log(`URL: ${url} -> Status: ${res.statusCode} Content-Type: ${res.headers['content-type']}`);
  }).on('error', (err) => {
    console.error(`Error fetching ${url}:`, err.message);
  });
});
