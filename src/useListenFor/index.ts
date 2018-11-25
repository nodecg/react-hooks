import {useEffect} from 'react';

export function useListenFor<T>(
	messageName: string,
	handler: (message: T) => void,
) {
	useEffect(() => {
		nodecg.listenFor(messageName, handler);
		return () => {
			nodecg.unlisten(messageName, handler);
		};
	}, []);
}
