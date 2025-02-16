import { build, emptyDir } from 'jsr:@deno/dnt';
import pkg from '../package.json' with { type: 'json' };

const outDir = './tmp';
const distDir = './deno';

await emptyDir(outDir);

await build({
  importMap: 'deno.json',
  typeCheck: false,
  test: false,
  declaration: true,
  declarationMap: false,
  sourceMap: false,
  minify: false,
  entryPoints: ['./deno/mod.ts'],
  outDir,
  shims: {
    deno: true,
  },
  packageManager: pkg.packageManager.split('@')[0] ?? 'npm',
  package: pkg,
  async postBuild() {
    for await (const entryPoint of Deno.readDir(`${outDir}/esm`)) {
      const inputFile = `${outDir}/esm/${entryPoint.name}`;
      const outputFile = `${distDir}/${entryPoint.name}`;
      await Deno.rename(inputFile, outputFile);

      console.log('\x1b[32m', `🚚 ${inputFile} -> ${outputFile}`);

      if (entryPoint.name.startsWith('_dnt.shims')) {
        const fileData = new TextDecoder('utf-8').decode(
          Deno.readFileSync(outputFile),
        );
        const result = fileData.replace(
          /(import|export)\s+(.+?)\s+from\s+(?:"@deno\/([^'";]+)");?/gs,
          (_, action, modules, path) => {
            console.log(
              `🔁 Replacing '${action} from "@deno/${path}"' by '${action} from "npm:@deno/${path}"' in ${outputFile}`,
            );
            return `${action} ${modules} from "npm:@deno/${path}";`;
          },
        );

        Deno.writeFile(outputFile, new TextEncoder().encode(result));
      }
    }
    await emptyDir(outDir);
  },
});
