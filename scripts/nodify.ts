import { build, emptyDir } from 'jsr:@deno/dnt';

const outDir = './tmp';
const distDir = './deno';

await emptyDir(outDir);

await build({
  importMap: 'deno.json',
  typeCheck: false,
  test: false,
  declaration: true,
  scriptModule: false,
  entryPoints: ['./deno/mod.ts'],
  outDir,
  shims: {
    deno: true,
  },
  package: {
    name: 'buno.js',
    version: Deno.args[0],
    description: 'Your package.',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/siguici/buno.git',
    },
    bugs: {
      url: 'https://github.com/siguici/buno/issues',
    },
  },
  async postBuild() {
    for await (const entryPoint of Deno.readDir(`${outDir}/esm`)) {
      await Deno.rename(
        `${outDir}/esm/${entryPoint.name}`,
        `${distDir}/${entryPoint.name}`,
      );
      console.log(
        `🚚 ${outDir}/esm/${entryPoint.name} -> ${distDir}/${entryPoint.name}`,
      );
    }
    await emptyDir(outDir);
  },
});
