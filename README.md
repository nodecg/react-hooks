# use-nodecg

[![Build Status](https://travis-ci.com/Hoishin/use-nodecg.svg?branch=master)](https://travis-ci.com/Hoishin/use-nodecg)
[![codecov](https://codecov.io/gh/Hoishin/use-nodecg/branch/master/graph/badge.svg)](https://codecov.io/gh/Hoishin/use-nodecg)
[![NpmLicense](https://img.shields.io/npm/l/use-nodecg.svg)](https://github.com/Hoishin/use-nodecg/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/use-nodecg.svg)](https://www.npmjs.com/package/use-nodecg)
[![npm version (next)](https://img.shields.io/npm/v/use-nodecg/next.svg)](https://www.npmjs.com/package/use-nodecg)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/use-nodecg.svg)](https://www.npmjs.com/package/use-nodecg)
[![npm download total](https://img.shields.io/npm/dt/use-nodecg.svg)](https://www.npmjs.com/package/use-nodecg)
[![npm type definitions](https://img.shields.io/npm/types/use-nodecg.svg)](https://www.typescriptlang.org/)
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

```tsx
import {useReplicant} from 'use-nodecg';

// This component will re-render when the `counter replicant value changes
export function RunnerName() {
	const [count, setCount] = useReplicant('counter');
	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount(count + 1)} />
		</div>
	);
}
```

### `useReplicantOnce`

-   Reads specified replicant value once, without subscribing to it.
-   Uses `readReplicant` internally.
-   Returns single value that will be updated once when it reads the value

```tsx
import {useReplicantOnce} from 'use-nodecg';

// Only reads the replicant value once and doesn't update
export function RunnerName() {
	const count = useReplicant('counter');
	return <div>{count}</div>;
}
```

### `useListenFor`

-   Subscribes messages with `listenFor`, and unlistens on unmount.
-   Combining with other hooks enables powerful stateful features with function component

```tsx
import {useListenFor} from 'use-nodecg';

// Shows modal for 1 second when NodeCG receives 'errorHappened' message from the server
export function AlertOnMessage() {
	const [showAlert, setShowAlert] = useState(false);
	useListenFor('errorHappened', () => {
		setShowAlert(true);
	});
	useEffect(
		() => {
			if (!showAlert) {
				return;
			}
			// Disappear alert 1 second after
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 1000);
			// Make sure to return cleanup function
			return () => {
				clearTimeout(timer);
			};
		},
		[showAlert],
	);

	return <Modal show={showAlert} />;
}
```

## License

MIT &copy; Keiichiro Amemiya (Hoishin)
