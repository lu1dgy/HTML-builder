const fs = require('fs');
const path = require('path');
const copy = require('../04-copy-directory');
const merge = require('../05-merge-styles');

const createHtml = async () => {
  try {
    let html = '';
    await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '');

    const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    stream.on('data', (file) => (html += file));

    stream.on('end', async () => {
      const files = await fs.promises.readdir(path.join(__dirname, 'components'), {
        withFileTypes: true,
      });
      const checkedFiles = files.filter((file) => file.isFile());

      for (const file of checkedFiles) {
        const fileName = file.name
          .split('.')
          .filter((_, i, arr) => i !== arr.length - 1)
          .join('');

        if (html.includes(`{{${fileName}}}`)) {
          let content = '';
          const readStr = fs.createReadStream(
            path.join(__dirname, 'components', file.name),
            'utf-8'
          );
          readStr.on('data', (file) => (content += file));

          readStr.on('end', async () => {
            html = html.split(`{{${fileName}}}`).join(content);

            if (checkedFiles.indexOf(file) === checkedFiles.length - 1) {
              await fs.promises.appendFile(
                path.join(__dirname, 'project-dist', 'index.html'),
                html
              );
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const makeBundle = async () => {
  try {
    const dir = await fs.promises.readdir(__dirname);

    if (dir.includes('project-dist')) {
      await fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true });
    }

    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    await copy(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
    await merge(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
    await createHtml();
  } catch (err) {
    console.log(err);
  }
};

makeBundle();
