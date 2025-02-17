import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { findUpSync } from './find_up';
import { whichRuntime } from './runtime';
import type { PackageManagerInfo, PackageManagerName, Version } from './types';

export type { PackageManagerInfo, PackageManagerName, Version };

export const defaultPackageManagerInfo: PackageManagerInfo = {
  name: 'npm',
};

export function isPackageManager(name: string): name is PackageManagerName {
  return ['npm', 'cnpm', 'yarn', 'pnpm', 'bun', 'deno'].includes(name);
}

export function whichPackageManager(cwd = process.cwd()): PackageManagerInfo {
  return (
    preferredPackageManager(cwd) ??
    detectedPackageManager(cwd) ??
    defaultPackageManagerInfo
  );
}

export function detectedPackageManager(
  cwd = process.cwd(),
): PackageManagerInfo | undefined {
  const userAgent = process.env.npm_config_user_agent;

  if (!userAgent) {
    const name = whichRuntime(cwd).name;

    if (isPackageManager(name)) {
      return { name };
    }

    return undefined;
  }

  return parseUserAgent(userAgent);
}

export function preferredPackageManager(
  cwd = process.cwd(),
): PackageManagerInfo | undefined {
  let name = '';
  let version: Version | undefined;
  let lockfile: string | undefined = '';
  const packageJson = join(cwd, 'package.json');

  if (existsSync(packageJson)) {
    try {
      const pkgManager = JSON.parse(
        readFileSync(packageJson, 'utf-8'),
      ).packageManager;
      if (pkgManager) {
        [name, version] = parsePackageManager(pkgManager);
      }
    } catch {
      // Ignore errors in `package.json`
    }
  }

  const lockfileDetection = [
    { lockfile: 'pnpm-lock.yaml', name: 'pnpm' },
    { lockfile: 'yarn.lock', name: 'yarn' },
    { lockfile: 'package-lock.json', name: 'npm' },
    { lockfile: 'bun.lockb', name: 'bun' },
    { lockfile: 'deno.lock', name: 'deno' },
  ];

  if (!name) {
    for (const { lockfile: pmLockfile, name: pmName } of lockfileDetection) {
      const lockfilePath = findUpSync(pmLockfile, { cwd });
      if (lockfilePath) {
        name = pmName;
        lockfile = lockfilePath;
        break;
      }
    }
  }

  lockfile = lockfile || undefined;

  if (isPackageManager(name)) {
    return { name, version, lockfile };
  }

  return undefined;
}

export function parsePackageManager(
  input: string,
): [PackageManagerName, Version] {
  const [name, version] = input.split('@', 2) as [PackageManagerName, Version];

  return [name, version];
}

export function parseUserAgent(userAgent: string): PackageManagerInfo {
  const pmSpec = userAgent.split(' ')[0];
  const separatorPos = pmSpec.lastIndexOf('/');
  const name = pmSpec.substring(0, separatorPos);
  const version = pmSpec.substring(separatorPos + 1) as Version;

  return {
    name: name === 'npminstall' ? 'cnpm' : (name as PackageManagerName),
    version,
  };
}
