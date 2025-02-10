import {
  type ExecException,
  type ExecOptions as NodeExecOptions,
  type SpawnOptions as NodeSpawnOptions,
  exec as nodeExec,
  execSync as nodeExecSync,
} from 'node:child_process';
import { spawn as nodeSpawn, sync as nodeSpawnSync } from 'cross-spawn';
import { isArgs, isSpawnOptions } from './helpers';
import type {
  ExecOptions as BenoExecOptions,
  SpawnOptions as BenoSpawnOptions,
  ExecCallback,
  ExecResult,
  ProcessResult,
} from './types';

export type ExecOptions = NodeExecOptions & BenoExecOptions;
export type SpawnOptions = NodeSpawnOptions & BenoSpawnOptions;
export type SpawnResult = Promise<ReturnType<typeof nodeSpawn>>;
export type SpawnSyncResult = ReturnType<typeof nodeSpawnSync>;
export type { ExecCallback, ExecResult, ProcessResult };

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
  command = Array.isArray(command) ? command.join(' ') : command;

  if (callback) {
    return new Promise((resolve) => {
      nodeExec(
        command,
        options,
        (
          error: ExecException | null,
          stdout: string | Buffer<ArrayBufferLike>,
          stderr: string | Buffer<ArrayBufferLike>,
        ) => {
          const result = {
            code: error?.code ?? 0,
            stdout: stdout?.toString(),
            stderr: stderr?.toString(),
            success: error === null,
            failed: error !== null,
          };
          callback(result);
          resolve(result);
        },
      );
    });
  }

  return new Promise((resolve) => {
    const result = nodeExec(command, options);
    const stdout = result.stdout?.toString();
    const stderr = result.stderr?.toString();
    const code = (result.exitCode ?? stderr) ? 1 : 0;

    resolve({
      code,
      stdout,
      stderr,
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
  try {
    const output = nodeExecSync(
      Array.isArray(command) ? command.join(' ') : command,
      options,
    );

    return {
      code: 0,
      stdout: output.toString(),
      stderr: undefined,
      success: true,
      failed: false,
    };
  } catch (error) {
    return {
      code: 1,
      stdout: undefined,
      stderr: error instanceof Error ? error.message : String(error),
      success: false,
      failed: true,
    };
  }
}

export async function spawn(command: string): SpawnResult;
export async function spawn(command: string, args: string[]): SpawnResult;
export async function spawn(
  command: string,
  options: SpawnOptions,
): SpawnResult;
export async function spawn(
  command: string,
  args: string[],
  options: SpawnOptions,
): SpawnResult;
export async function spawn(
  command: string,
  argsOrOpts?: string[] | SpawnOptions,
  options?: SpawnOptions,
): SpawnResult {
  if (options === undefined) {
    if (argsOrOpts === undefined) {
      return nodeSpawn(command);
    }

    if (!(isArgs(argsOrOpts) || isSpawnOptions(argsOrOpts))) {
      throw new TypeError('The second argument must be an array or an object');
    }

    return nodeSpawn(
      command,
      argsOrOpts as typeof argsOrOpts extends string[]
        ? string[]
        : SpawnOptions,
    );
  }

  if (!isArgs(argsOrOpts)) {
    throw new TypeError('The second argument must be an array');
  }

  return nodeSpawn(command, argsOrOpts as string[], options);
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
  if (options === undefined) {
    if (argsOrOpts === undefined) {
      return nodeSpawnSync(command);
    }

    if (!(isArgs(argsOrOpts) || isSpawnOptions(argsOrOpts))) {
      throw new TypeError('The second argument must be an array or an object');
    }

    return nodeSpawnSync(
      command,
      argsOrOpts as typeof argsOrOpts extends string[]
        ? string[]
        : SpawnOptions,
    );
  }

  if (!isArgs(argsOrOpts)) {
    throw new TypeError('The second argument must be an array');
  }

  return nodeSpawnSync(command, argsOrOpts as string[], options);
}
