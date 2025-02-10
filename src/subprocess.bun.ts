import type {
  SpawnOptions as BunSpawnOptions,
  Subprocess as BunSubprocess,
  SyncSubprocess as BunSyncSubprocess,
} from 'bun';
import { isArgs, isSpawnOptions } from './helpers';
import type {
  ExecOptions as BenoExecOptions,
  SpawnOptions as BenoSpawnOptions,
  ExecCallback,
  ExecResult,
  IO,
  ProcessResult,
  Stdio,
} from './types';

export type ExecOptions = BenoExecOptions & BunSpawnOptions.OptionsObject;
export type SpawnOptions = BenoSpawnOptions & BunSpawnOptions.OptionsObject;
export type SpawnResult<T extends Stdio | undefined = undefined> = Promise<
  T extends undefined
    ? BunSubprocess<'ignore', 'pipe', 'inherit'>
    : BunSubprocess<Stdin<T>, Stdout<T>, Stderr<T>>
>;
export type SpawnSyncResult<T extends Stdio | undefined = undefined> =
  T extends undefined
    ? BunSyncSubprocess<'pipe', 'pipe'>
    : BunSyncSubprocess<Stdout<T>, Stderr<T>>;
export type { ExecCallback, ExecResult, ProcessResult };

type Stdin<T extends Stdio | undefined> = T extends IO
  ? T
  : T extends { stdin: IO }
    ? T['stdin']
    : undefined;
type Stdout<T extends Stdio | undefined> = T extends IO
  ? T
  : T extends { stdout: IO }
    ? T['stdout']
    : undefined;
type Stderr<T extends Stdio | undefined> = T extends IO
  ? T
  : T extends { stderr: IO }
    ? T['stderr']
    : undefined;

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
      proc: BunSubprocess<'ignore', 'pipe', 'pipe'>,
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

export function execSync(command: string | string[]): ProcessResult;
export function execSync(
  command: string | string[],
  options: ExecOptions,
): ProcessResult;
export function execSync(
  command: string | string[],
  options?: ExecOptions,
): ProcessResult {
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

export async function spawn(command: string): SpawnResult;
export async function spawn(command: string, args: string[]): SpawnResult;
export async function spawn(
  command: string,
  options: SpawnOptions,
): SpawnResult<(typeof options)['stdio']>;
export async function spawn(
  command: string,
  args: string[],
  options: SpawnOptions,
): SpawnResult<(typeof options)['stdio']>;
export async function spawn(
  command: string,
  argsOrOpts?: string[] | SpawnOptions,
  options?: SpawnOptions,
): SpawnResult<typeof options extends { stdio: infer U } ? U : undefined> {
  let args: string[] | undefined = [];
  if (argsOrOpts !== undefined) {
    args = isArgs(argsOrOpts) ? argsOrOpts : [];
    options = isSpawnOptions(argsOrOpts) ? argsOrOpts : undefined;
  }

  return Bun.spawn([command, ...args], options);
}

export function spawnSync(command: string): SpawnSyncResult;
export function spawnSync(command: string, args: string[]): SpawnSyncResult;
export function spawnSync(
  command: string,
  options: SpawnOptions,
): SpawnSyncResult<(typeof options)['stdio']>;
export function spawnSync(
  command: string,
  args: string[],
  options: SpawnOptions,
): SpawnSyncResult<(typeof options)['stdio']>;
export function spawnSync(
  command: string,
  argsOrOpts?: string[] | SpawnOptions,
  options?: SpawnOptions,
): SpawnSyncResult<typeof options extends { stdio: infer U } ? U : undefined> {
  let args: string[] | undefined = [];
  if (argsOrOpts !== undefined) {
    args = isArgs(argsOrOpts) ? argsOrOpts : [];
    options = isSpawnOptions(argsOrOpts) ? argsOrOpts : undefined;
  }

  if (isSpawnOptions(options)) {
    if ('stdio' in options) {
      if (Array.isArray(options.stdio)) {
        [options.stdin, options.stdout, options.stderr] = Array.isArray(
          options.stdio,
        )
          ? options.stdio
          : [options.stdio, options.stdio, options.stdio];
      } else if (typeof options.stdio === 'string') {
        const stdio = options.stdio;
        options.stdin = stdio;
        options.stdout = stdio;
        options.stderr = stdio;
      }
    }
  }

  return Bun.spawnSync([command, ...args], options);
}
