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

- >[Node.js 🟢](https://nodejs.org/)
- >[Bun 🟣](https://bun.sh/)
- >[Deno 🔵](https://deno.com/)

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
  import { path, fs } from 'buno.js';
  ```

- Import from `JSR`:

  ```javascript
  import { path, fs } from '@siguici/buno';
  ```

- Import without install (using `Deno`):

  ```javascript
  import { path, fs } from 'jsr:@siguici/buno';
  ```

- Use the `plug` function to define a plugin:

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
