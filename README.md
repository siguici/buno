# Buno ⚙️

**Buno.js** is a cross-platform runtime adapter for JavaScript and TypeScript,
designed to unify API access across Node.js, Bun, and Deno environments.
It allows developers to write portable code with consistent APIs,
optimizing performance and compatibility for each runtime.

## ✨ Features

- **Cross-Platform Compatibility**: Works seamlessly across Node.js, Bun, and Deno.
- **Unified API**: Provides a consistent interface for accessing common modules
  like `fs`, `path`, etc.
- **Runtime Detection**: Automatically detects the runtime environment
  and loads the appropriate implementation.
- **Optimized Performance**: Adapts to each runtime's specific features
  for optimal performance.

## 🛠️ Supported Runtimes

- [Node.js 🟢](https://nodejs.org/)
- [Bun 🟣](https://bun.sh/)
- [Deno 🔵](https://deno.com/)

## 🚀 Installation

You can install [`Buno`](https://github.com/siguici/buno)
from [`NPM`](https://npmjs.com/package/buno.js) or [`JSR`](https://jsr.io/@siguici/buno):

- Using `npm`:

  From [`NPM`](https://npmjs.com/package/buno.js):

  ```bash
  npm install buno.js
  ```

  From [`JSR`](https://jsr.io/@siguici/buno):

  ```bash
  npx jsr add @siguici/buno
  ```

- Using `Yarn`:

  From [`NPM`](https://npmjs.com/package/buno.js):

  ```bash
  yarn add buno.js
  ```

  From [`JSR`](https://jsr.io/@siguici/buno):

  ```bash
  yarn dlx jsr add @siguici/buno
  ```

- Using `PNPM`:

  From [`NPM`](https://npmjs.com/package/buno.js):

  ```bash
  pnpm add buno.js
  ```

  From [`JSR`](https://jsr.io/@siguici/buno):

  ```bash
  pnpm dlx jsr add @siguici/buno
  ```

- Using `Bun`:

  From [`NPM`](https://npmjs.com/package/buno.js):

  ```bash
  bun install buno.js
  ```

  From [`JSR`](https://jsr.io/@siguici/buno):

  ```bash
  bunx jsr add @siguici/buno
  ```

- Using `Deno`:

  From [`NPM`](https://npmjs.com/package/buno.js):

  ```bash
  deno install npm:buno.js
  ```

  From [`JSR`](https://jsr.io/@siguici/buno):

  ```bash
  deno add @siguici/buno
  ```

  Without install:

  ```typescript
  import buno.js from 'jsr:@siguici/buno';
  ```

## 💡 Usage

- Import from `NPM`:

  ```javascript
  import { fs, path } from 'buno.js';
  ```

- Import from `JSR`:

  ```javascript
  import { fs, path } from '@siguici/buno';
  ```

- Import without install (using `Deno`):

  ```javascript
  import { fs, path } from 'jsr:@siguici/buno';
  ```

- Use modules imported from `Buno`:

  ```typescript
  // Example usage of fs
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  // Example usage of path
  const fullPath = path.resolve('example.txt');
  console.log(fullPath);
  ```

## ⚙️ Node.js API Compatibility

Buno aims to unify and simplify cross-runtime development
by providing a consistent interface for [Node.js APIs](https://nodejs.org/api/)
across [Deno](https://deno.com/) and [Bun](https://bun.sh/).
While Buno strives for complete Node.js API compatibility,
some modules may have partial or no implementation in specific runtimes.
Most [npm packages](https://www.npmjs.com/) intended for `Node.js` environments
will work seamlessly with Buno, but the best way to ensure compatibility is
to test them directly.

This document is regularly updated to reflect the compatibility status
of the latest versions of `Deno` and `Bun`.
The information below reflects Buno's compatibility with _Node.js v20 APIs_
as implemented in both `Deno` and `Bun`. If you encounter any compatibility issues,
please [open an issue on GitHub](https://github.com/siguici/buno/issues/new/choose).
Reporting such issues helps us prioritize and address gaps in compatibility.

- ✅ = Implemented in both
- ⚠️ = Partial support
- ❌ = Not implemented in either

- 🟢 = Fully implemented
- 🟡 = Partially implemented
- 🔴 = Not implemented

### 📦 Built-in Module Support

- ✅ **node:assert**
  - 🟢 Fully implemented in both.

- ⚠️ **node:async_hooks**
  - 🟡 Only `AsyncLocalStorage`, and `AsyncResource` are implemented.
    `AsyncResource` is missing bind in Bun.
  - 🟡 `AsyncLocalStorage` is supported. `AsyncResource`, `executionAsyncId`,
    and `createHook` are non-functional stubs in Deno.

- ✅ **node:buffer**
  - 🟢 Fully implemented in both.

- ⚠️ **node:child_process**
  - 🟡 Missing `proc.gid`, `proc.uid`. Stream class not exported.
    IPC cannot send socket handles in Bun.
  - 🟢 Fully implemented in Deno

- ❌ **node:cluster**
  - 🔴 Not implemented in both.

- ✅ **node:console**
  - 🟢 Fully implemented in both.

- ⚠️ **node:crypto**
  - 🟡 Missing various methods including `Certificate`, `ECDH`, `X509Certificate`,
    etc. Some methods are not optimized in Bun.
  - 🟡 Missing `Certificate class`, `crypto.Cipheriv.prototype.setAutoPadding`,
    `crypto.Decipheriv.prototype.setAutoPadding`, `crypto.publicDecrypt`,
    `crypto.ECDH.prototype.convertKey`, `x448` option for `generateKeyPair`,
    `crypto.KeyObject`, and other methods in Deno.

- ⚠️ **node:dgram**
  - 🟡 Missing several methods such as `setBroadcast`, `setTTL`, `setMulticastTTL`,
    etc., in Bun.
  - 🟡 Some methods are non-functional stubs in Deno.

- ✅ **node:diagnostics_channel**
  - 🟢 Fully implemented in both.

- ⚠️ **node:dns**
  - 🟡 Missing `cancel`, `setServers`, `getDefaultResultOrder` in Bun.
  - 🟡 Missing `dns.resolve*` with `ttl` option in Deno.

- ⚠️ **node:domain**
  - 🔴 All exports are non-functional stubs in both

- ⚠️ **node:events**
  - 🟡 `events.addAbortListener` & `events.getMaxListeners`
    do not support (web api) `EventTarget` in Bun.
  - 🟢 Fully implemented in Deno

- ⚠️ **node:fs**
  - 🟡 Missing `statfs`, `statfsSync`, `opendirSync`.
    Dir is partially implemented in Bun.
  - 🟡 Missing `utf16le`, `latin1`, and `ucs2` encoding for `fs.writeFile` and `fs.writeFileSync`.
    `lchmod` is missing in `fs/promises` in Deno.

- ✅ **node:http**
  - 🟢 Fully implemented in both.
    Outgoing client request body is currently buffered instead of streamed in Bun.

- ⚠️ **node:http2**
  - 🟡 Client is supported, but server isn't yet in Bun.
  - 🟡 Partially supported, major work in progress to enable `grpc-js` in Deno.

- ⚠️ **node:https**
  - 🟡 APIs are implemented, but Agent is not always used yet in Bun.
  - 🟡 `Missing https.Server.opts.cert` and `https.Server.opts.key` array type in Deno.

- ❌ **node:inspector**
  - 🔴 Not implemented in both.

- ⚠️ **node:module**
  - 🟡 Missing `runMain`, `syncBuiltinESMExports`, `Module#load()`.
    Attempts to override or patch the module cache will fail in Bun.
  - 🟡 The `register()` function is not supported in Deno.

- ⚠️ **node:net**
  - 🟡 Missing `SocketAddress` `Stream`, `BlockList` is a no-op in Bun.
  - 🟡 Missing `net.Socket.prototype.constructor` with `fd` option in Deno.

- ✅ **node:os**
  - 🟢 Fully implemented in both.

- ✅ **node:path**
  - 🟢 Fully implemented in both.

- ⚠️ **node:perf_hooks**
  - 🟡 Missing `createHistogram`, `monitorEventLoopDelay` in Bun.
  - 🟡 Missing `perf_hooks.eventLoopUtilization`, `perf_hooks.timerify`,
    `perf_hooks.monitorEventLoopDelay` in Deno.

- ⚠️ **node:process**
  - 🟡 See `process` Global in Bun.
  - 🟡 Missing `multipleResolves`, `worker` events in Deno.

- ✅ **node:punycode**
  - 🟢 Fully implemented in both.

- ✅ **node:querystring**
  - 🟢 Fully implemented in both.

- ✅ **node:readline**
  - 🟢 Fully implemented in both.

- ❌ **node:repl**
  - 🔴 Not implemented in Bun.
  - 🟡 `builtinModules` and `_builtinLibs` are supported.
    Missing `REPLServer.prototype.constructor` and `start()` in Deno.

- ⚠️ **node:stream**
  - 🟡 Missing `getDefaultHighWaterMark`, `setDefaultHighWaterMark`, `toWeb` in Bun.
  - 🟢 Fully implemented in Deno.

- ✅ **node:string_decoder**
  - 🟢 Fully implemented in both.

- ✅ **node:sys**
  - 🟢 Fully implemented in both.

- ❌ **node:test**
  - 🔴 Not implemented in Bun. Use `bun:test` instead.
  - 🟡 Currently only test API is supported in Deno.

- ✅ **node:timers**
  - 🟢 Fully implemented in both.

- ⚠️ **node:tls**
  - 🟡 Missing `createSecurePair` in both.

- ❌ **node:trace_events**
  - 🔴 Not implemented in both.

- ✅ **node:tty**
  - 🟢 Fully implemented in both.

- ⚠️ **node:util**
  - 🟡 Missing `MIMEParams`, `MIMEType`, `aborted`, `debug`, `getSystemErrorMap`,
    `transferableAbortController`, `transferableAbortSignal` in Bun.
  - 🟡 Missing `aborted`, `transferableAbortSignal`, `transferableAbortController`,
    `MIMEParams`, `MIMEType` and `getSystemErrorMap` in Deno.

- ✅ **node:url**
  - 🟢 Fully implemented in both.

- ❌ **node:v8**
  - 🟡 `serialize` and `deserialize` use JavaScriptCore's wire format
    instead of V8's. Otherwise, not implemented in Bun.
  - 🟡 `cachedDataVersionTag` and `getHeapStatistics` are supported. `setFlagsFromStrings`
    is a noop. Other APIs are not supported and will throw an error in Deno.

- ⚠️ **node:vm**
  - 🟡 Core functionality works,
    but experimental VM ES modules are not implemented in Bun.
  - 🟡 Partial support in Deno

- ❌ **node:wasi**
  - 🔴 Not implemented in both.

- ⚠️ **node:worker_threads**
  - 🟡 Worker doesn't support the following options in Bun:
    `stdin`, `stdout`, `stderr`, `trackedUnmanagedFds`, `resourceLimits`.
    Missing `markAsUntransferable`, `moveMessagePortToContext`,
    `getHeapSnapshot` in Bun.
  - 🟡 Missing `parentPort.emit`, `parentPort.removeAllListeners`,
    `markAsUntransferable`, `moveMessagePortToContext`, `receiveMessageOnPort`,
    `Worker.prototype.getHeapSnapshot` in Deno.

- ⚠️ **node:zlib**
  - 🟡 Unoptimized in Bun.
  - 🟢 Fully implemented in Deno.

### 🌐 Globals support

- ✅ **`AbortController`**

- ✅ **`AbortSignal`**

- ✅ **`Blob`**

- ✅ **`Buffer`**

- ✅ **`ByteLengthQueuingStrategy`**

- ⚠️ **`__dirname`**
  - 🟢 Fully supported in Bun
  - 🔴 Not implemented in Deno

- ⚠️ **`__filename`**
  - 🟢 Fully supported in Bun
  - 🔴 Not implemented in Deno

- ✅ **`atob()`**

- ✅ **`BroadcastChannel`**

- ✅ **`btoa()`**

- ✅ **`clearImmediate()`**

- ✅ **`clearInterval()`**

- ✅ **`clearTimeout()`**

- ❌ **`CompressionStream`**
  - 🟢 Not implemented in Bun
  - 🔴 Fully supported in Deno

- ✅ **`console`**

- ✅ **`CountQueuingStrategy`**

- ✅ **`Crypto`**

- ✅ **`SubtleCrypto` (crypto)**

- ✅ **`CryptoKey`**

- ✅ **`CustomEvent`**

- ❌ **`DecompressionStream`**
  - 🔴 Not implemented in Bun
  - 🟢 Fully supported in Deno

- ✅ **`Event`**

- ✅ **`EventTarget`**

- ✅ **`exports`**

- ✅ **`fetch`**

- ✅ **`FormData`**

- ✅ **`global`**
  - 🟡 Fully supported in both (Note: In Bun, `globalThis` aliases to `global`.)

- ✅ **`globalThis`**

- ✅ **`Headers`**

- ✅ **`MessageChannel`**

- ✅ **`MessageEvent`**

- ✅ **`MessagePort`**

- ✅ **`module`**

- ✅ **`PerformanceEntry`**

- ✅ **`PerformanceMark`**

- ✅ **`PerformanceMeasure`**

- ✅ **`PerformanceObserver`**

- 🔴 **`PerformanceObserverEntryList`**
  - 🟢 Fully supported in Bun
  - 🔴 Not implemented in Deno

- ❌ **`PerformanceResourceTiming`**

- ✅ **`performance`**

- ⚠️ **`process`**
  - 🟡 Partial support in Bun (Missing several methods and features)
  - 🟢 Fully supported in Deno

- ✅ **`queueMicrotask()`**

- ✅ **`ReadableByteStreamController`**

- ✅ **`ReadableStream`**

- ✅ **`ReadableStreamBYOBReader`**

- ✅ **`ReadableStreamBYOBRequest`**

- ✅ **`ReadableStreamDefaultController`**

- ✅ **`ReadableStreamDefaultReader`**

- ✅ **`require()`**
  - 🟢 Fully supported in Bun (including `require.main`, `require.cache`, `require.resolve`)
  - 🟢 Fully supported in Deno

- ✅ **`Response`**

- ✅ **`Request`**

- ✅ **`setImmediate()`**

- ✅ **`setInterval()`**

- ✅ **`setTimeout()`**

- ✅ **`structuredClone()`**

- ✅ **`DOMException`**

- ✅ **`TextDecoder`**

- ✅ **`TextDecoderStream`**

- ✅ **`TextEncoder`**

- ✅ **`TextEncoderStream`**

- ✅ **`TransformStream`**

- ✅ **`TransformStreamDefaultController`**

- ✅ **`URL`**

- ✅ **`URLSearchParams`**

- ✅ **`WebAssembly`**

- ✅ **`WritableStream`**

- ✅ **`WritableStreamDefaultController`**

- ✅ **`WritableStreamDefaultWriter`**

## 🤝Contributing

Contributions are welcome! If you have suggestions or improvements,
please open an issue or submit a pull request on GitHub.

## 📜 License

This project is licensed under the MIT License -
see the [LICENSE.md file](./LICENSE.md) for details.

## 🔗 Contact

For questions or feedback, you can reach out to [siguici@proton.me](mailto:siguici@proton.me).

---

**Buno** aims to make cross-runtime development easier and more efficient.
We hope you find it useful! 🎉
