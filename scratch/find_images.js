const fs = require('fs');

const files = ['index.html', 'chat.html', 'projects-showcase.html', 'blogs-showcase.html', 'skills-kinetic.html'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    console.log(`--- Images in ${file} ---`);
    const imgRegex = /src=["']([^"']+)["']/g;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      console.log(match[1]);
    }
  }
});
