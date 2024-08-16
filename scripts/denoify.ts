import { fs, path } from '../src';

const directoryPath = path.resolve(import.meta.dir, '..', 'deno');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    throw err;
  }

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        const result = data.replace(/node:node:/g, 'node:');

        fs.writeFile(filePath, result, 'utf8', (err) => {
          if (err) {
            throw err;
          }
          console.log('[\x1b[32m+\x1b[0m]', `${file} denoified`);
        });
      });
    }
  }
});
