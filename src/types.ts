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
export type ExecResult = Promise<Output>;
export type ExecSyncResult = Output;
export type ExecCallback<T = void> = (output: Output) => T;

export type ChildProcess = {
  kill(signo?: Signal): void;
};

export type ProcessResult = {
  status: Status;
  signal: Signal;
};
WritableStream<Uint8Array>;
export type Stdio = {
  stdin: string;
  stdout: string;
  stderr: string;
};
export type Status = {
  code: number;
  success: boolean;
  failed: boolean;
};
export type Output = Status & {
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
