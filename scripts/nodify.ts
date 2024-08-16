import { build, emptyDir } from 'jsr:@deno/dnt';

await emptyDir('./tmp');

await build({
  importMap: 'deno.json',
  typeCheck: false,
  test: false,
  declaration: true,
  scriptModule: false,
  entryPoints: ['./jsr/mod.ts'],
  outDir: './tmp',
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
    await emptyDir('npm');
    await Deno.rename('tmp/esm', 'npm');
    await emptyDir('tmp');
  },
});
