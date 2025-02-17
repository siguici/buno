import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RuntimeInfo, RuntimeName, Version } from './types';

export type { RuntimeInfo, RuntimeName, Version };

export const defaultRuntimeInfo: RuntimeInfo = {
  name: 'node',
  version: getRuntimeVersion('node'),
};

export function whichRuntime(cwd = process.cwd()): RuntimeInfo {
  return preferredRuntime(cwd) ?? detectedRuntime() ?? defaultRuntimeInfo;
}

export function detectedRuntime(): RuntimeInfo | undefined {
  let name: RuntimeName;
  //@ts-ignore
  if (typeof Bun !== 'undefined') {
    name = 'bun';
    //@ts-ignore
  } else if (typeof Deno !== 'undefined') {
    name = 'deno';
  } else {
    name = 'node';
  }

  const version = getRuntimeVersion(name);

  if (version) {
    return {
      name,
      version,
    };
  }

  return undefined;
}

export function isRuntime(name: string): name is RuntimeName {
  return ['node', 'bun', 'deno'].includes(name);
}

export function getRuntimeVersion(runtime: string): Version | undefined {
  switch (runtime) {
    case 'node':
      // @ts-ignore
      return process.versions.node;
    case 'deno':
      // @ts-ignore
      return Deno.version.deno;
    case 'bun':
      // @ts-ignore
      return Bun.version;
    default:
      return undefined;
  }
}

export function preferredRuntime(cwd = process.cwd()): RuntimeInfo | undefined {
  let engines: Record<string, string> = {};
  const packageJson = join(cwd, 'package.json');

  if (existsSync(packageJson)) {
    try {
      engines = JSON.parse(readFileSync(packageJson, 'utf-8')).engines || {};
    } catch {}
  }

  for (let name of Object.keys(engines)) {
    name = name.toLowerCase();
    if (isRuntime(name)) {
      return {
        name,
        version: getRuntimeVersion(name),
      };
    }
  }

  return undefined;
}
