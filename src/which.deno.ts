import type { WhichOptions, WhichResult } from './types';

export type { WhichOptions, WhichResult };

const isWindows = Deno.build.os === 'windows';
const pathDelimiter = isWindows ? ';' : ':';
const dirDelimiter = isWindows ? '\\' : '/';
const PATH = Deno.env.get('PATH') ?? '';
const PATHEXT =
  (Deno.env.get('PATHEXT') ?? isWindows)
    ? ['.EXE', '.CMD', '.BAT', '.COM'].join(pathDelimiter)
    : '';

const getPathInfo = ({
  path: optPath = PATH,
  pathExt: optPathExt = PATHEXT,
}) => {
  const paths = optPath.split(pathDelimiter).filter(Boolean);
  const exts = isWindows
    ? optPathExt
        .split(pathDelimiter)
        .flatMap((item) => [item, item.toLowerCase()])
    : [''];

  return { paths, exts };
};

function normalizePath(path: string) {
  path = path.replace(/[\\\/]/g, dirDelimiter);
  if (!path.endsWith(dirDelimiter)) {
    path += dirDelimiter;
  }
  return path;
}

async function isFile(path: string): Promise<boolean> {
  try {
    return Deno.stat(path).then((stat) => stat.isFile);
  } catch (err) {
    if (err instanceof Deno.errors.PermissionDenied) {
      throw err;
    }
    return false;
  }
}

function isFileSync(path: string): boolean {
  try {
    return Deno.statSync(path).isFile;
  } catch (err) {
    if (err instanceof Deno.errors.PermissionDenied) {
      throw err;
    }
    return false;
  }
}

export async function which(
  command: string,
  options: WhichOptions,
): Promise<WhichResult> {
  const { paths, exts } = getPathInfo(options);

  for (const path of paths) {
    for (const ext of exts) {
      const pathWithExt = normalizePath(path + dirDelimiter + command + ext);
      if (await isFile(pathWithExt)) {
        return pathWithExt;
      }

      if (isWindows) {
        const lowerPathWithExt = pathWithExt.toLowerCase();
        if (await isFile(lowerPathWithExt)) {
          return lowerPathWithExt;
        }
      }
    }
  }

  return null;
}

export function whichSync(command: string, options: WhichOptions): WhichResult {
  const { paths, exts } = getPathInfo(options);

  for (const path of paths) {
    for (const ext of exts) {
      const pathWithExt = normalizePath(path + dirDelimiter + command + ext);
      if (isFileSync(pathWithExt)) {
        return pathWithExt;
      }

      if (isWindows) {
        const lowerPathWithExt = pathWithExt.toLowerCase();
        if (isFileSync(lowerPathWithExt)) {
          return lowerPathWithExt;
        }
      }
    }
  }

  return null;
}
