const fs = require('fs');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readInt32BE(16);
  const height = buf.readInt32BE(20);
  return { width, height };
}

function getJpgDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  let i = 4;
  while (i < buf.length) {
    const marker = buf.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      const height = buf.readUInt16BE(i + 3);
      const width = buf.readUInt16BE(i + 5);
      return { width, height };
    }
    const len = buf.readUInt16BE(i);
    i += len;
  }
  return null;
}

try {
  console.log('PNG:', getPngDimensions('C:/Users/Hp/.gemini/antigravity/brain/bb1b507d-6c2d-498d-8968-b7901ef33c88/media__1780590006413.png'));
} catch (e) {
  console.error('PNG error:', e.message);
}

try {
  console.log('JPG:', getJpgDimensions('C:/Users/Hp/.gemini/antigravity/brain/bb1b507d-6c2d-498d-8968-b7901ef33c88/media__1780590025986.jpg'));
} catch (e) {
  console.error('JPG error:', e.message);
}
