import {useEffect, useState} from 'react';

export const useReplicant = <T>(repName: string, initialValue: T) => {
	const [value, setValue] = useState(initialValue);
	const replicant = nodecg.Replicant(repName, {
		defaultValue: initialValue,
	});
	const changeHandler = (newValue: T) => {
		setValue(newValue);
	};
	useEffect(() => {
		replicant.on('change', changeHandler);
		return () => {
			replicant.removeListener('change', changeHandler);
		};
	}, []);
	return value;
};
