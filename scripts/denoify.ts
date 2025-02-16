import { fs, path } from '../src';

const directoryPath = path.resolve(import.meta.dir, '..', 'deno');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    throw err;
  }

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (filePath.match(/\.(?:node|bun)\.c?ts$/)) {
      fs.rmSync(filePath);
      console.log('\x1b[32m', `🗑️  ${filePath} removed`);
      continue;
    }

    if (file.endsWith('.ts')) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        const result = data
          .replace(/node:node:/g, 'node:')
          .replace(
            /(import|export)\s+(.+?)\s+from\s+['"](\.\/?[^'";]+)(?<!\.ts)['"];?/gs,
            (_, action, modules, path) => {
              console.log(
                `🔁 Replacing '${action} from ${path}' by '${action} from ${path}.ts' in ${filePath}`,
              );
              return `${action} ${modules} from '${path}.ts';`;
            },
          );

        fs.writeFile(filePath, result, 'utf8', (err) => {
          if (err) {
            throw err;
          }
          console.log('\x1b[32m', `✏️  ${filePath} fixed`);
        });
      });
    }
  }
});
