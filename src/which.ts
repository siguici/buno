import _which from 'which';

const _whichSync = _which.sync;

function chdir(directory?: string): () => void {
  if (directory) {
    const cwd = process.cwd();
    process.chdir(directory);

    return () => process.chdir(cwd);
  }

  return () => {};
}

const which = async (
  command: string,
  options: { PATH?: string; cwd?: string },
): Promise<string | null> => {
  const opts = { nothrow: true, path: options.PATH };
  const ch = chdir(options.cwd);
  let result: string | null;

  if (options.cwd) {
    result = await _which(command, opts);
  } else {
    result = _whichSync(command, opts);
  }
  ch();
  return result;
};

const whichSync = (
  command: string,
  options: { PATH?: string; cwd?: string },
): string | null => {
  const opts = { nothrow: true, path: options.PATH };
  const ch = chdir(options.cwd);
  let result: string | null;

  if (options.cwd) {
    result = _whichSync(command, opts);
  } else {
    result = _whichSync(command, opts);
  }
  ch();
  return result;
};

export { which, whichSync };
