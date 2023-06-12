import type {JestConfigWithTsJest} from 'ts-jest';

export default {
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: './tests/tsconfig.json',
			},
		],
	},
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
} satisfies JestConfigWithTsJest;
