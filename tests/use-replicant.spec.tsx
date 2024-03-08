/**
 * @jest-environment jsdom
 */

import { EventEmitter } from "events";

import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";

import { useReplicant } from "../src";
import type NodeCG from "@nodecg/types";

const replicantHandler = jest.fn();
const replicantRemoveListener = jest.fn();

// Intercept mock function
class Replicant extends EventEmitter {
	private _value?: any;

	constructor(
		public name: string,
		initialValues: NodeCG.Replicant.OptionsWithDefault<{
			defaultValue?: unknown;
		}>,
	) {
		super();

		const { defaultValue } = initialValues;
		if (typeof defaultValue !== "undefined") {
			this.value = defaultValue;
		}
	}

	override on(event: string, payload: any): this {
		replicantHandler(event, payload);
		return super.on(event, payload);
	}

	override removeListener(event: string, listener: () => void): this {
		replicantRemoveListener();
		return super.removeListener(event, listener);
	}

	set value(newValue: any) {
		this._value = newValue;
		this.emit("change", newValue);
	}

	get value(): any {
		return this._value;
	}
}

const allReplicants = new Map<string, Replicant>();
const replicantConstructor = jest.fn(
	(name: string, options: NodeCG.Replicant.OptionsWithDefault<any>) => {
		if (allReplicants.has(name)) {
			return allReplicants.get(name);
		}
		const replicant = new Replicant(name, options);
		allReplicants.set(name, replicant);
		return replicant;
	},
);

(global as any).nodecg = {
	Replicant: replicantConstructor,
};

interface RunnerNameProps {
	prefix?: string;
}

type RunnerNameReplicant = {
	runner: {
		name: string;
	};
};

const RunnerName: React.FC<RunnerNameProps> = (props) => {
	const { prefix } = props;
	const repName = `${prefix ?? "default"}:currentRun`;
	const [currentRun] = useReplicant<RunnerNameReplicant>(repName, {
		defaultValue: { runner: { name: "foo" } },
	});
	if (!currentRun) {
		return null;
	}
	return <div>{currentRun.runner.name}</div>;
};

// Example of a replicant with a mutating value.
const Counter: React.FC = () => {
	const [counter, setCounter] = useReplicant<number>("counter", {
		defaultValue: 0,
	});
	if (typeof counter !== "number") return null;
	return (
		<button
			onClick={() => {
				setCounter(counter + 1);
			}}
		>
			{counter}
		</button>
	);
};

let renderResult: RenderResult;
beforeEach(() => {
	allReplicants.clear();
	replicantHandler.mockReset();
	replicantRemoveListener.mockReset();
});

test("Initializes replicant correctly", () => {
	renderResult = render(<RunnerName />);
	expect(replicantConstructor).toBeCalledWith("default:currentRun", {
		defaultValue: {
			runner: { name: "foo" },
		},
	});
});

test("Change handler is set correctly", () => {
	renderResult = render(<RunnerName />);
	expect(replicantHandler).toBeCalledTimes(1);
});

test.skip("Change not triggered on rerender", () => {
	renderResult = render(<RunnerName />);
	const timesCalled = replicantHandler.mock.calls.length;
	renderResult.rerender(<RunnerName />);
	expect(replicantHandler).toBeCalledTimes(timesCalled);
});

test("Handles replicant name changes", () => {
	renderResult = render(<RunnerName />);
	const timesCalled = replicantHandler.mock.calls.length;
	renderResult.rerender(<RunnerName prefix="test2" />);
	expect(replicantConstructor).toBeCalledWith("test2:currentRun", {
		defaultValue: {
			runner: { name: "foo" },
		},
	});
	expect(replicantHandler).toBeCalledTimes(timesCalled + 1);
});

test.skip("Handles replicant changes", () => {
	renderResult = render(<RunnerName />);
	expect(allReplicants.size).toEqual(1);
	const replicant = allReplicants.values().next().value as EventEmitter;
	void act(() => {
		replicant.emit("change", { runner: { name: "bar" } });
	});
	renderResult.rerender(<RunnerName />);
	expect(renderResult.container.textContent).toBe("bar");
});

test("Can change replicant value using hook", () => {
	renderResult = render(<Counter />);
	expect(allReplicants.has("counter")).toBe(true);
	expect(renderResult.container.firstChild).toBeTruthy();
	const replicant = allReplicants.get("counter");

	// We know its not undefined cause we asserted it, but we have a picky linter.
	if (typeof replicant === "undefined") return;
	if (renderResult.container.firstChild === null) return;

	const initialValue = replicant.value as number;
	expect(replicant.value).toBe(0);

	fireEvent.click(renderResult.container.firstChild as Element);
	renderResult.rerender(<Counter />);
	expect(replicant.value).toBe(initialValue + 1);
});

test("Unlistens when unmounted", () => {
	renderResult = render(<RunnerName />);
	renderResult.unmount();
	expect(replicantRemoveListener).toBeCalledTimes(1);
});
