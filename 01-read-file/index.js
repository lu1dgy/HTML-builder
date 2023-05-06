const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath);

stream.on('data', (text) => {
  process.stdout.write(text);
});

stream.on('error', (err) => console.log(err));
