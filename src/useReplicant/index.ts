import {useEffect, useState} from 'react';
import clone from 'lodash.clone';

export interface UseReplicantOptions {
	namespace: string;
}

/**
 * Subscribe to a replicant, returns tuple of the replicant value and `setValue` function.
 * The component using this function gets re-rendered when the value is updated.
 * The `setValue` function can be used to update replicant value.
 * @param repName The name of the replicant to use
 * @param initialValue Initial value to pass to `useState` function
 * @param options Options object.  Currently supports the optional `namespace` option
 */
export const useReplicant = <T>(
	repName: string,
	initialValue: T,
	options?: UseReplicantOptions,
): [T, (newValue: T) => void] => {
	// Local state to store replicant value
	const [value, updateValue] = useState<T>(initialValue);

	// Declare replicant
	let replicant: any;
	if (options && options.namespace) {
		replicant = nodecg.Replicant(repName, options.namespace, {
			defaultValue: initialValue,
		});
	} else {
		replicant = nodecg.Replicant(repName, {
			defaultValue: initialValue,
		});
	}

	// Change handler to listen replicant changes
	const changeHandler = (newValue: T): void => {
		updateValue((oldValue) => {
			if (newValue !== oldValue) {
				return newValue;
			}
			return clone(newValue);
		});
	};

	// Uses no state directly, removes listener on unmount
	useEffect(() => {
		replicant.on('change', changeHandler);
		return () => {
			replicant.removeListener('change', changeHandler);
		};
	}, [replicant]);

	// Function to set replicant value
	const updateRepValue = (newValue: T): void => {
		replicant.value = newValue;
	};

	return [value, updateRepValue];
};
