const fs = require('fs').promises;
const path = require('path');

const merge = async (source, target) => {
  try {
    await fs.writeFile(target, '');

    const files = await fs.readdir(source, { withFileTypes: true });
    const checkedFiles = files.filter((item) => item.isFile() && item.name.endsWith('.css'));

    for (const file of checkedFiles) {
      const fileContent = await fs.readFile(path.join(source, file.name), 'utf-8');
      await fs.appendFile(target, fileContent);
    }
  } catch (err) {
    console.log(err);
  }
};

merge(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));

module.exports = merge;
