# Contributing

Thanks for taking the time to contribute! This document explains how to get a
local development environment running and what we expect from a pull request.

## Development workflow

The library source lives in [`src/`](./src) and is written in TypeScript. The
[`example/`](./example) folder contains a runnable React Native app.

```sh
# install dependencies
npm install --legacy-peer-deps

# typecheck
npm run typecheck

# lint & format
npm run lint
npm run format

# run the tests
npm test

# build the publishable output (CJS + ESM + d.ts)
npm run build
```

The package is built with
[`react-native-builder-bob`](https://github.com/callstack/react-native-builder-bob).
`npm run build` writes compiled output to `lib/` (gitignored); it runs
automatically on `prepare`.

## Pull requests

- Branch from `master`.
- Keep the **public API stable**: do not rename exports, props, or change
  default prop values without a clear, documented major-version rationale.
- Add or update tests for any behavior change.
- Make sure `npm run typecheck`, `npm run lint`, and `npm test` pass.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit
  messages (e.g. `fix: ...`, `feat: ...`, `docs: ...`).
- Update [`CHANGELOG.md`](./CHANGELOG.md) under `## [Unreleased]`.

## Reporting issues

Please use the issue templates and include your React Native version,
`react-native-linear-gradient` version, platform (iOS/Android), and a minimal
reproduction.
