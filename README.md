# use-nodecg

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
