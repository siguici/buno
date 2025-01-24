import _which from 'which';
import type { WhichOptions, WhichResult } from './types';

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
  options: WhichOptions,
): Promise<WhichResult> => {
  const opts = { nothrow: true, path: options.path };
  const ch = chdir(options.cwd);
  let result: WhichResult;

  if (options.cwd) {
    result = await _which(command, opts);
  } else {
    result = _whichSync(command, opts);
  }
  ch();
  return result;
};

const whichSync = (command: string, options: WhichOptions): WhichResult => {
  const opts = { nothrow: true, path: options.path };
  const ch = chdir(options.cwd);
  let result: WhichResult;

  if (options.cwd) {
    result = _whichSync(command, opts);
  } else {
    result = _whichSync(command, opts);
  }
  ch();
  return result;
};

export { which, whichSync };
