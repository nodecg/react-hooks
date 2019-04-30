import {useState} from 'react';

export interface UseReplicantOnceOptions {
	bundle: string;
}

export const useReplicantOnce = <T>(
	replicantName: string,
	initialValue: T,
	options?: UseReplicantOnceOptions,
): T => {
	const [state, setState] = useState(initialValue);
	if (options && options.bundle) {
		nodecg.readReplicant<T>(replicantName, options.bundle, (value) => {
			setState(value);
		});
	} else {
		nodecg.readReplicant<T>(replicantName, (value) => {
			setState(value);
		});
	}
	return state;
};
