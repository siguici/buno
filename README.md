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

## ⚙️  Node.js API Compatibility

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

- ✅ = Full support
- ℹ️ = Partial support
- ❌ = Stubs only

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
