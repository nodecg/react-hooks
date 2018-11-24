# use-nodecg

[![Build Status](https://travis-ci.com/Hoishin/use-nodecg.svg?branch=master)](https://travis-ci.com/Hoishin/use-nodecg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm version](https://img.shields.io/npm/v/use-nodecg.svg)
![npm version (next)](https://img.shields.io/npm/v/use-nodecg/next.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/use-nodecg.svg)
![npm download total](https://img.shields.io/npm/dt/use-nodecg.svg)
![npm type definitions](https://img.shields.io/npm/types/use-nodecg.svg)
[![node version](https://img.shields.io/node/v/use-nodecg.svg)](https://nodejs.org/en/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This package is a collection custom hooks of [React Hooks](https://reactjs.org/docs/hooks-intro.html) for NodeCG API.

🚨 This package is in alpha state, as well as the React Hooks API itself. Do not use in production. But feel free to try out and file an issue for suggestion/bugs!

## Install

```sh
npm install use-nodecg@next
# or
yarn add use-nodecg@next
```

## Usage

### `useReplicant`

-   Subscribes to specified replicant and returns the value as state.
-   Allows you to use replicant values in function component.

```ts
import {useReplicant} from 'use-nodecg';

// This component will re-render when the `currentRun` replicant value changes
export function RunnerName() {
	const currentRun = useReplicant('currentRun');
	return <div>{currentRun.runner.name}</div>;
}
```

## License

MIT &copy; Keiichiro Amemiya (Hoishin)
