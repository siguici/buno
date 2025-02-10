import type { SpawnOptions, Subprocess } from 'bun';
import type {
  ExecOptions as BenoExecOptions,
  ExecCallback,
  ExecResult,
  ExecSyncResult,
} from './types';

export type ExecOptions = BenoExecOptions & SpawnOptions.OptionsObject;
export type { ExecCallback, ExecResult, ExecSyncResult };

export function exec(command: string | string[]): ExecResult;
export function exec(
  command: string | string[],
  options: ExecOptions,
): ExecResult;
export function exec<T = void>(
  command: string | string[],
  options: ExecOptions,
  callback: ExecCallback<T>,
): ExecResult;
export function exec<T = void>(
  command: string | string[],
  options?: ExecOptions,
  callback?: ExecCallback<T>,
): ExecResult {
  if (options !== undefined) {
    options.stdio = ['ignore', 'pipe', 'pipe'];
  }
  if (callback) {
    if (options === undefined) {
      options = {};
    }
    options.onExit = (
      proc: Subprocess<'ignore', 'pipe', 'pipe'>,
      exitCode: number,
      signalCode: number | null,
      error: Error | undefined,
    ) => {
      const stdio = {
        stdout: proc.stdout.toString(),
        stderr: proc.stderr.toString(),
      };
      const cbOpts =
        exitCode === 0
          ? {
              code: 0,
              signal: signalCode,
              success: true,
              failed: false,
              error: null,
              ...stdio,
            }
          : {
              code: exitCode,
              signal: signalCode,
              success: false,
              failed: true,
              error:
                error ||
                new Error(
                  `Process exited with code ${exitCode} signal ${signalCode}`,
                ),
              ...stdio,
            };
      callback(cbOpts);
    };
  }
  return new Promise((resolve) => {
    const child = Bun.spawn(
      Array.isArray(command) ? command : command.split(/\s+/),
      options,
    );
    const code = (child.exitCode ?? child.stderr) ? 1 : 0;
    resolve({
      code,
      stdout: child.stdout.toString(),
      stderr: child.stderr,
      success: code === 0,
      failed: code !== 0,
    });
  });
}

export function execSync(command: string | string[]): ExecSyncResult;
export function execSync(
  command: string | string[],
  options: ExecOptions,
): ExecSyncResult;
export function execSync(
  command: string | string[],
  options?: ExecOptions,
): ExecSyncResult {
  if (options !== undefined) {
    options.stdio = ['ignore', 'pipe', 'pipe'];
  }
  const child = Bun.spawn(
    Array.isArray(command) ? command : command.split(/\s+/),
    options,
  );

  const code = (child.exitCode ?? child.stderr) ? 1 : 0;

  return {
    code,
    stdout: child.stdout.toString(),
    stderr: child.stderr,
    success: code === 0,
    failed: code !== 0,
  };
}
