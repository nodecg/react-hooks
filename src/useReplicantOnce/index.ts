import {useState} from 'react';

export function useReplicantOnce<T>(replicantName: string, initialValue: T) {
	const [state, setState] = useState(initialValue);
	nodecg.readReplicant<T>(replicantName, value => {
		setState(value);
	});
	return state;
}
