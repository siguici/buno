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

- 🟢 = Fully implemented
- 🟡 = Partially implemented
- 🔴 = Not implemented

### 📦 Built-in Module Support

- 🟢 **`assert`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`async_hooks`**
  - [x] AsyncLocalStorage supported
  - [ ] AsyncResource missing bind (Not implemented on Bun)

- 🟢 **`buffer`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`child_process`**
  - [x] Fully supported on Deno
  - [ ] Missing proc.gid, proc.uid; Stream class not exported;
        IPC limitations (Not implemented on Bun)

- 🔴 **`cluster`**
  - [ ] Not implemented on both Deno and Bun

- 🟢 **`console`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`crypto`**
  - [x] Fully supported on Deno
  - [ ] Missing features like Certificate class, ECDH, X509Certificate, etc.
        (Not implemented on Bun)

- 🟡 **`dgram`**
  - [x] Basic functionality supported
  - [ ] Missing multiple methods (Not implemented on Bun)

- 🟢 **`diagnostics_channel`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`dns`**
  - [x] Basic functionality supported
  - [ ] Missing options like ttl (Not implemented on Bun)

- 🔴 **`domain`**
  - [ ] Not implemented on both Deno and Bun

- 🟡 **`events`**
  - [x] Basic functionality supported
  - [ ] Some methods and EventTarget support missing (Not implemented on Bun)

- 🟡 **`fs`**
  - [x] Fully supported on Deno
  - [ ] Missing some encodings and lchmod (Not implemented on Bun)

- 🟡 **`http`**
  - [x] Fully supported on both Deno and Bun
  - [ ] Some options not fully supported (Not implemented on Bun)

- 🟡 **`http2`**
  - [x] Basic client support
  - [ ] Server functionality missing (Not implemented on Bun)

- 🟡 **`https`**
  - [x] Basic functionality supported
  - [ ] Missing some options like cert and key array type (Not implemented on Bun)

- 🔴 **`inspector`**
  - [ ] Not implemented on both Deno and Bun

- 🟡 **`module`**
  - [x] Fully supported on Deno
  - [ ] `register()` function not supported (Not implemented on Bun)

- 🟡 **`net`**
  - [x] Basic functionality supported
  - [ ] Missing certain features like SocketAddress Stream (Not implemented on Bun)

- 🟢 **`os`**
  - [x] Fully supported on both Deno and Bun

- 🟢 **`path`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`perf_hooks`**
  - [x] Basic functionality supported
  - [ ] Missing some features (Not implemented on Bun)

- 🟡 **`process`**
  - [x] Basic functionality supported
  - [ ] Missing some features like multipleResolves (Not implemented on Bun)

- 🟢 **`punycode`**
  - [x] Fully supported on both Deno and Bun

- 🟢 **`querystring`**
  - [x] Fully supported on both Deno and Bun

- 🟢 **`readline`**
  - [x] Fully supported on both Deno and Bun

- 🔴 **`repl`**
  - [ ] Not implemented on both Deno and Bun

- 🟡 **`stream`**
  - [x] Basic functionality supported
  - [ ] Missing some methods (Not implemented on Bun)

- 🟢 **`string_decoder`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`sys`**
  - [x] Basic functionality supported
  - [ ] Refer to `util` for some features (Not implemented on Bun)

- 🔴 **`test`**
  - [ ] Not implemented on Bun; Use `bun:test` instead

- 🟢 **`timers`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`tls`**
  - [x] Basic functionality supported
  - [ ] Missing `createSecurePair` (Not implemented on Bun)

- 🔴 **`trace_events`**
  - [ ] Not implemented on both Deno and Bun

- 🟢 **`tty`**
  - [x] Fully supported on both Deno and Bun

- 🟢 **`url`**
  - [x] Fully supported on both Deno and Bun

- 🟡 **`util`**
  - [x] Basic functionality supported
  - [ ] Missing several features (Not implemented on Bun)

- 🔴 **`v8`**
  - [x] Some basic features supported
  - [ ] Serialize and deserialize use JavaScriptCore’s wire format
        (Not implemented on Bun)

- 🟡 **`vm`**
  - [x] Core functionality works
  - [ ] Experimental VM ES modules are not implemented (Not implemented on Bun)

- 🔴 **`wasi`**
  - [x] Partially implemented on Bun
  - [ ] Limited support (Not implemented on Deno)

- 🟡 **`worker_threads`**
  - [x] Basic functionality supported
  - [ ] Missing several features (Not implemented on Bun)

- 🟡 **`zlib`**
  - [x] Basic functionality supported
  - [x] Unoptimized on Bun

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
