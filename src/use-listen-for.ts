import {useEffect} from 'react';

export interface UseListenForOptions {
	bundle: string;
}

export const useListenFor = <T>(
	messageName: string,
	handler: (message: T) => void,
	options?: UseListenForOptions,
): void => {
	useEffect(() => {
		if (options?.bundle) {
			nodecg.listenFor(messageName, options.bundle, handler);
			return () => {
				nodecg.unlisten(messageName, options.bundle, handler);
			};
		}
		nodecg.listenFor(messageName, handler);
		return () => {
			nodecg.unlisten(messageName, handler);
		};
	}, [handler, messageName, options]);
};
