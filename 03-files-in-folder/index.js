const fs = require('fs').promises;
const path = require('path');

const checkSize = async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    const checkedFile = files.filter((file) => file.isFile());

    for (const file of checkedFile) {
      try {
        const stats = await fs.stat(path.join(__dirname, 'secret-folder', file.name));
        const split = file.name.split('.');
        console.log(`${split.slice(0, -1)} - ${split[split.length - 1]} - ${stats.size}b`);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
checkSize();
