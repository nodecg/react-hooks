import {useEffect} from 'react';

export const useListenFor = <T>(
	messageName: string,
	handler: (message: T) => void,
): void => {
	useEffect(() => {
		nodecg.listenFor(messageName, handler);
		return () => {
			nodecg.unlisten(messageName, handler);
		};
	}, []);
};
