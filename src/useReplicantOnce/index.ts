import {useState} from 'react';

export const useReplicantOnce = <T>(
	replicantName: string,
	initialValue: T,
): T => {
	const [state, setState] = useState(initialValue);
	nodecg.readReplicant<T>(replicantName, (value) => {
		setState(value);
	});
	return state;
};
