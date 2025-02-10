import type {
  ExecOptions as BenoExecOptions,
  ExecCallback,
  ExecResult,
  ExecSyncResult,
} from './types';

export type ExecOptions = BenoExecOptions & Deno.CommandOptions;

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

export function execSync(command: string | string[]): ExecSyncResult;
export function execSync(
  command: string | string[],
  options?: ExecOptions,
): ExecSyncResult {
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
