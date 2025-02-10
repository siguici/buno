import {
  type ExecException,
  type ExecOptions as NodeExecOptions,
  exec as nodeExec,
  execSync as nodeExecSync,
} from 'node:child_process';
import { spawn as nodeSpawn, sync as nodeSpawnSync } from 'cross-spawn';
import type {
  ExecOptions as BenoExecOptions,
  ExecCallback,
  ExecResult,
  ExecSyncResult,
} from './types';

export type ExecOptions = NodeExecOptions & BenoExecOptions;
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

export function execSync(command: string | string[]): ExecSyncResult;
export function execSync(
  command: string | string[],
  options: ExecOptions,
): ExecSyncResult;
export function execSync(
  command: string | string[],
  options?: ExecOptions,
): ExecSyncResult {
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

const spawn = nodeSpawn;
const spawnSync = nodeSpawnSync;

export { spawn, spawnSync };
