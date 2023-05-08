const fs = require('fs').promises;
const path = require('path');

const mkdir = async (source, target) => {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });
    const checkedFiles = files.filter((item) => item.isFile());
    const dirs = files.filter((item) => item.isDirectory());

    await fs.mkdir(target, { recursive: true });

    for (const file of checkedFiles) {
      await fs.copyFile(path.join(source, file.name), path.join(target, file.name));
    }

    for (const dir of dirs) {
      await mkdir(path.join(source, dir.name), path.join(target, dir.name));
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const copy = async () => {
  try {
    const dir = await fs.readdir(__dirname);
    const copyPath = path.join(__dirname, 'files-copy');

    if (dir.includes('files-copy')) {
      await fs.rm(copyPath, { recursive: true });
    }

    await mkdir(path.join(__dirname, 'files'), copyPath);
  } catch (err) {
    throw new Error(err.message);
  }
};

copy();

module.exports = mkdir;
