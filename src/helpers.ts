import { fileURLToPath } from 'node:url';
import type { SpawnOptions } from './types';

export function isSpawnOptions(opts: unknown): opts is SpawnOptions {
  return typeof opts === 'object';
}

export function isArgs(args: unknown): args is string[] {
  return Array.isArray(args);
}

export const toPath = (urlOrPath: string | URL): string =>
  urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
