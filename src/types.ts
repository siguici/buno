export type WhichOptions = { path?: string; cwd?: string };
export type WhichResult = string | null;

export type Cwd = string | URL;
export interface Env {
  [key: string]: string;
}

export type ExecOptions = Partial<{
  cwd: string;
  env: Record<string, string>;
}>;
export type ExecResult = Promise<ProcessResult>;
export type ExecCallback<T = void> = (output: ProcessResult) => T;

export type SpawnOptions = ExecOptions & { stdio?: Stdio };

export type IO = 'pipe' | 'ignore' | 'inherit';
export type Stdio =
  | IO
  | {
      stdin: IO;
      stdout: IO;
      stderr: IO;
    };
export type Status = {
  code: number;
  success: boolean;
  failed: boolean;
};
export type ProcessResult = Status & {
  stdout: string | undefined;
  stderr: string | undefined;
};
export type Signal =
  | 'SIGABRT'
  | 'SIGALRM'
  | 'SIGBREAK'
  | 'SIGBUS'
  | 'SIGCHLD'
  | 'SIGCONT'
  | 'SIGEMT'
  | 'SIGFPE'
  | 'SIGHUP'
  | 'SIGILL'
  | 'SIGINFO'
  | 'SIGINT'
  | 'SIGIO'
  | 'SIGPOLL'
  | 'SIGUNUSED'
  | 'SIGKILL'
  | 'SIGPIPE'
  | 'SIGPROF'
  | 'SIGPWR'
  | 'SIGQUIT'
  | 'SIGSEGV'
  | 'SIGSTKFLT'
  | 'SIGSTOP'
  | 'SIGSYS'
  | 'SIGTERM'
  | 'SIGTRAP'
  | 'SIGTSTP'
  | 'SIGTTIN'
  | 'SIGTTOU'
  | 'SIGURG'
  | 'SIGUSR1'
  | 'SIGUSR2'
  | 'SIGVTALRM'
  | 'SIGWINCH'
  | 'SIGXCPU'
  | 'SIGXFSZ';
