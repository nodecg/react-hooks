# @nodecg/react-hooks

This package is a collection custom hooks of [React Hooks](https://reactjs.org/docs/hooks-intro.html) for NodeCG API.

🚨 This package is in alpha state. But feel free to try out and file an issue for suggestion/bugs!

## Install

```sh
npm install @nodecg/react-hooks
# or
yarn add @nodecg/react-hooks
# or
pnpm add @nodecg/react-hooks
```

## About React Hooks

(This section comes from when React hooks was just introduced as an alpha feature, but is still useful to keep as an introduction.)

The React Hooks are a new way of **sharing code** between components, introduced in version 16.8.

**_Please read the documentation of React Hooks thoroughly before using them._**

-   [Video introduction](https://youtu.be/dpw9EHDh2bM)
-   [The Motivation](https://reactjs.org/docs/hooks-intro.html#motivation)
-   [Rules](https://reactjs.org/docs/hooks-rules.html)
-   [Hooks API reference](https://reactjs.org/docs/hooks-reference.html)
-   [FAQ](https://reactjs.org/docs/hooks-faq.html)

It also helps to learn the background mechanism of React Hooks.
[React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

## Recommendation

Use [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) in your project. It is 100% smarter than you to detect violation of the Rules of Hooks.

## Usage

### `useReplicant`

-   Subscribes to specified replicant and returns the value as state.
-   Allows you to use replicant values in function component.

```tsx
import {useReplicant} from '@nodecg/react-hooks';

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

### `useListenFor`

-   Subscribes messages with `listenFor`, and unlistens on unmount.
-   Combining with other hooks enables powerful stateful features with function component

```tsx
import {useListenFor} from '@nodecg/react-hooks';

// Shows modal for 1 second when NodeCG receives 'errorHappened' message from the server
export function AlertOnMessage() {
	const [showAlert, setShowAlert] = useState(false);
	useListenFor('errorHappened', () => {
		setShowAlert(true);
	});
	useEffect(() => {
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
	}, [showAlert]);

	return <Modal show={showAlert} />;
}
```

## License

MIT &copy; Keiichiro Amemiya (Hoishin)
