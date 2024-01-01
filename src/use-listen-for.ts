import { useEffect } from "react";

export interface UseListenForOptions {
	bundle?: string;
}

export const useListenFor = <T>(
	messageName: string,
	handler: (message: T) => void,
	{ bundle }: UseListenForOptions = {},
): void => {
	useEffect(() => {
		if (bundle) {
			nodecg.listenFor(messageName, bundle, handler);
			return () => {
				nodecg.unlisten(messageName, bundle, handler);
			};
		}
		nodecg.listenFor(messageName, handler);
		return () => {
			nodecg.unlisten(messageName, handler);
		};
	}, [handler, messageName, bundle]);
};
