import type { WhichOptions, WhichResult } from './types';

const whichSync = (command: string, options: WhichOptions): WhichResult =>
  Bun.which(command, { cwd: options.cwd, PATH: options.path });

const which = (command: string, options: WhichOptions): Promise<WhichResult> =>
  new Promise((resolve, reject) => {
    try {
      resolve(whichSync(command, options));
    } catch (e) {
      reject(e);
    }
  });

export { which, whichSync };
