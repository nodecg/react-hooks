/* eslint-disable prefer-arrow/prefer-arrow-functions */

import {EventEmitter} from 'events';
import React from 'react';
import {render, RenderResult, act} from 'react-testing-library';
import {useReplicant} from '..';

const replicantHandler = jest.fn();
const replicantRemoveListener = jest.fn();

// Intercept mock function
class Replicant extends EventEmitter {
	on(event: string, payload: any): this {
		replicantHandler(event, payload);
		return super.on(event, payload);
	}
	removeListener(event: string, listener: () => void): this {
		replicantRemoveListener();
		return super.removeListener(event, listener);
	}
}

const allReplicants = new Map<string, Replicant>();
const replicantConstructor = jest.fn((name: string) => {
	if (allReplicants.has(name)) {
		return allReplicants.get(name);
	}
	const replicant = new Replicant();
	allReplicants.set(name, replicant);
	return replicant;
});

(global as any).nodecg = {
	Replicant: replicantConstructor,
};

interface RunnerNameProps {
	prefix?: string;
}

const RunnerName: React.FC<RunnerNameProps> = (props): JSX.Element => {
	const {prefix} = props;
	const repName = `${prefix || 'default'}:currentRun`;
	const [currentRun] = useReplicant(repName, {runner: {name: 'foo'}});
	return <div>{currentRun.runner.name}</div>;
};

let renderResult: RenderResult;
beforeEach(() => {
	allReplicants.clear();
	replicantHandler.mockReset();
	replicantRemoveListener.mockReset();
	renderResult = render(<RunnerName />);
});

test('Initializes replicant correctly', () => {
	expect(replicantConstructor).toBeCalledWith('default:currentRun', {
		defaultValue: {
			runner: {name: 'foo'},
		},
	});
});

test('Change handler is set correctly', () => {
	expect(replicantHandler).toBeCalledTimes(1);
});

test('Change not triggered on rerender', () => {
	const timesCalled = replicantHandler.mock.calls.length;
	renderResult.rerender(<RunnerName />);
	expect(replicantHandler).toBeCalledTimes(timesCalled);
});

test('Handles replicant name changes', () => {
	const timesCalled = replicantHandler.mock.calls.length;
	renderResult.rerender(<RunnerName prefix='test2' />);
	expect(replicantConstructor).toBeCalledWith('test2:currentRun', {
		defaultValue: {
			runner: {name: 'foo'},
		},
	});
	expect(replicantHandler).toBeCalledTimes(timesCalled + 1);
});

test('Handles replicant changes', () => {
	expect(allReplicants.size).toEqual(1);
	const replicant = allReplicants.values().next().value;
	act(() => {
		replicant.emit('change', {runner: {name: 'bar'}});
	});
	renderResult.rerender(<RunnerName />);
	expect(renderResult.container.textContent).toBe('bar');
});

test('Unlistens when unmounted', () => {
	renderResult.unmount();
	expect(replicantRemoveListener).toBeCalledTimes(1);
});
