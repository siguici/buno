const whichSync = Bun.which;
const which = (
  command: string,
  options: { PATH?: string; cwd?: string },
): Promise<string | null> =>
  new Promise((resolve, reject) => {
    try {
      resolve(whichSync(command, options));
    } catch (e) {
      reject(e);
    }
  });

export { which, whichSync };
