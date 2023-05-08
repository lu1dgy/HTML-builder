const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');

const errorHandler = (err) => {
  if (err) console.log(err);
};

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', errorHandler);

stdout.write('Text:\n');

stdin.on('data', (str) => {
  const consoleInput = str.toString().trim();

  if (consoleInput === 'exit') {
    process.exit();
  } else {
    fs.appendFile(filePath, str, errorHandler);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('bye bye\n'));
