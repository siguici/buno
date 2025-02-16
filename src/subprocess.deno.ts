import { isArgs, isSpawnOptions } from './helpers';
import type {
  ExecOptions as BenoExecOptions,
  SpawnOptions as BenoSpawnOptions,
  ExecCallback,
  ExecResult,
  ProcessResult,
} from './types';

export type ExecOptions = BenoExecOptions & Deno.CommandOptions;
export type SpawnOptions = BenoSpawnOptions & Deno.CommandOptions;
export type SpawnResult = Promise<Deno.ChildProcess>;
export type SpawnSyncResult = Deno.ChildProcess;
export type { ExecCallback, ExecResult, ProcessResult };

export async function exec(command: string | string[]): ExecResult;
export async function exec(
  command: string | string[],
  options: ExecOptions,
): ExecResult;
export async function exec<T = void>(
  command: string | string[],
  options: ExecOptions,
  callback: ExecCallback<T>,
): ExecResult;
export async function exec<T = void>(
  command: string | string[],
  options?: ExecOptions,
  callback?: ExecCallback<T>,
): ExecResult {
  let args = Array.isArray(command) ? command : command.split(/\s+/);
  command = args[0];
  args = args.slice(1);

  const proc = new Deno.Command(command, {
    args,
    ...options,
  });

  if (callback) {
    const output = await proc.output();
    const result = {
      code: output.code,
      success: output.success,
      failed: !output.success,
      stderr: output.stderr.toString(),
      stdout: output.stdout.toString(),
    };
    callback(result);

    return result;
  }
  return proc.output().then((output) => ({
    code: output.code,
    stdout: output.stdout.toString(),
    stderr: output.stderr.toString(),
    success: output.success,
    failed: !output.success,
  }));
}

export function execSync(command: string | string[]): ProcessResult;
export function execSync(
  command: string | string[],
  options?: ExecOptions,
): ProcessResult {
  let args = Array.isArray(command) ? command : command.split(/\s+/);
  command = args[0];
  args = args.slice(1);

  const proc = new Deno.Command(command, {
    args,
    ...options,
  });

  const output = proc.outputSync();
  const result = {
    code: output.code,
    success: output.success,
    failed: !output.success,
    stderr: output.stderr.toString(),
    stdout: output.stdout.toString(),
  };

  return result;
}

export function spawn(command: string): SpawnResult;
export function spawn(command: string, args: string[]): SpawnResult;
export function spawn(command: string, options: SpawnOptions): SpawnResult;
export function spawn(
  command: string,
  args: string[],
  options: SpawnOptions,
): SpawnResult;
export function spawn(
  command: string,
  argsOrOpts?: string[] | SpawnOptions,
  options?: SpawnOptions,
): SpawnResult {
  return new Promise((resolve) => {
    if (options === undefined) {
      if (argsOrOpts === undefined) {
        resolve(spawnSync(command));
      } else {
        resolve(
          spawnSync(
            command,
            argsOrOpts as typeof argsOrOpts extends string[]
              ? string[]
              : SpawnOptions,
          ),
        );
      }
    } else {
      resolve(spawnSync(command, argsOrOpts as string[], options));
    }
  });
}

export function spawnSync(command: string): SpawnSyncResult;
export function spawnSync(command: string, args: string[]): SpawnSyncResult;
export function spawnSync(
  command: string,
  options: SpawnOptions,
): SpawnSyncResult;
export function spawnSync(
  command: string,
  args: string[],
  options: SpawnOptions,
): SpawnSyncResult;
export function spawnSync(
  command: string,
  argsOrOpts?: string[] | SpawnOptions,
  options?: SpawnOptions,
): SpawnSyncResult {
  let args: string[] | undefined = [];
  if (argsOrOpts !== undefined) {
    args = isArgs(argsOrOpts) ? argsOrOpts : undefined;
    options = isSpawnOptions(argsOrOpts) ? argsOrOpts : undefined;
  }

  if (isSpawnOptions(options)) {
    if ('stdio' in options) {
      if (Array.isArray(options.stdio)) {
        const [stdin, stdout, stderr] = Array.isArray(options.stdio)
          ? options.stdio
          : [options.stdio, options.stdio, options.stdio];
        options.stdin = io(stdin);
        options.stdout = io(stdout);
        options.stderr = io(stderr);
      } else if (typeof options.stdio === 'string') {
        const stdio = io(options.stdio);
        options.stdin = stdio;
        options.stdout = stdio;
        options.stderr = stdio;
      }
    }
  }

  return new Deno.Command(command, {
    args,
    ...options,
  }).spawn();
}

function io(io: string): 'null' | 'piped' | 'inherit' {
  return io === 'pipe' ? 'piped' : io === 'ignore' ? 'null' : 'inherit';
}
