import esbuild, { type BuildOptions } from 'esbuild';
import { globbySync } from 'globby';
import pkg from '../package.json';
import { fs, path, zlib } from '../src/';
import tsconfig from '../tsconfig.json';

type Target = BuildOptions['target'] | 'default';
type Format = BuildOptions['format'];

const entryPoints = globbySync(tsconfig.include, {
  gitignore: true,
  ignore: tsconfig.exclude,
});

const defaultFormat =
  pkg.type && pkg.type.toLowerCase() === 'module' ? 'esm' : 'cjs';
const outdir = tsconfig.compilerOptions.outDir;
const target = tsconfig.compilerOptions.target || 'default';
const minify = !tsconfig.compilerOptions.pretty;
const watch = process.argv.includes('--watch');
const dtsdir = tsconfig.compilerOptions.declarationDir || outdir;

bunify(entryPoints, dtsdir);
build(entryPoints, outdir, target, [undefined, 'cjs', 'esm'], minify, watch);

const files = fs.readdirSync(outdir);
for (const file of files) {
  const filePath = path.join(outdir, file);
  await outputSize(filePath);
}

function bunify(
  entryPoints: string[],
  outdir: string,
  srcdir = 'src',
  ext = 'ts',
) {
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir, { recursive: true });
  }

  for (const entryPoint of entryPoints) {
    if (entryPoint.startsWith(`${srcdir}/`) && entryPoint.endsWith(`.${ext}`)) {
      const relative = entryPoint.substring(srcdir.length + 1);
      const outfile = path.join(outdir, relative);
      fs.copyFileSync(entryPoint, outfile);
      console.log('\x1b[32m', `🚚 ${entryPoint} -> ${outfile}`);
    }
  }
}

function getBuildOptions(
  { format, minify, ...options }: BuildOptions,
  watch: boolean,
): BuildOptions {
  const define = {
    CDN: 'true',
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
  };

  return {
    ...options,
    platform: 'node',
    minify,
    format: format ?? defaultFormat,
    sourcemap: !minify,
    outExtension:
      format === 'cjs'
        ? { '.js': '.cjs' }
        : format === 'esm'
          ? { '.js': '.mjs' }
          : { '.js': '.js' },
    define,
  };
}

async function build(
  entryPoints: string[],
  outdir: string,
  target: Target,
  formats: Format[] = ['cjs', 'esm'],
  minify = false,
  watch = false,
) {
  for (const format of formats) {
    const options = getBuildOptions(
      {
        entryPoints,
        outdir,
        target,
        format,
        minify,
      },
      watch,
    );
    await (watch
      ? esbuild.context(options).then((ctx) => ctx.watch())
      : esbuild.build(options));
  }
}

async function outputSize(file: string) {
  const content = fs.readFileSync(file);
  const bytes = zlib.brotliCompressSync(content).length;
  const size = bytesToSize(bytes);

  console.log('[\x1b[32m+\x1b[0m]', `📦️ ${file} bundle size: ${size}`);
}

function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
