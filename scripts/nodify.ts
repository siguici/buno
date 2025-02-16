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
      await Deno.rename(
        `${outDir}/esm/${entryPoint.name}`,
        `${distDir}/${entryPoint.name}`,
      );
      console.log(
        '\x1b[32m',
        `🚚 ${outDir}/esm/${entryPoint.name} -> ${distDir}/${entryPoint.name}`,
      );
    }
    await emptyDir(outDir);
  },
});
