import type { SpawnOptions } from './types';

export function isSpawnOptions(opts: unknown): opts is SpawnOptions {
  return typeof opts === 'object';
}

export function isArgs(args: unknown): args is string[] {
  return Array.isArray(args);
}
