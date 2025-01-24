import _which from 'which';

const _whichSync = _which.sync;

const which = async (
  command: string,
  options: { PATH?: string; cwd?: string },
): Promise<string | null> => {
  const opts = { nothrow: true, path: options.PATH };
  let result: string | null;

  if (options.cwd) {
    const owd = process.cwd();
    process.chdir(options.cwd);
    result = await _which(command, opts);
    process.chdir(owd);
  } else {
    result = _whichSync(command, opts);
  }

  return result;
};

const whichSync = (
  command: string,
  options: { PATH?: string; cwd?: string },
): string | null => {
  const opts = { nothrow: true, path: options.PATH };
  let result: string | null;

  if (options.cwd) {
    const owd = process.cwd();
    process.chdir(options.cwd);
    result = _whichSync(command, opts);
    process.chdir(owd);
  } else {
    result = _whichSync(command, opts);
  }

  return result;
};

export { which, whichSync };
