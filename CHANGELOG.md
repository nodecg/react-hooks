# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-2](https://github.com/nodecg/react-hooks/compare/v0.4.1-2...v1.0.0-2) (2024-01-01)


### ⚠ BREAKING CHANGES

* useReplicantOnce is removed because it is not so complicated to provide as a custom hook, and there is not much use for it.
* **package:** It is now disallowed to import `use-nodecg/esm` or `use-nodecg/cjs`

### Features

* allow function as setReplicant value ([#268](https://github.com/nodecg/react-hooks/issues/268)) ([22fa294](https://github.com/nodecg/react-hooks/commit/22fa2945bfff4e5185e4f4985f6182c6560cd386))
* **package:** add "exports" to package.json ([#261](https://github.com/nodecg/react-hooks/issues/261)) ([982680a](https://github.com/nodecg/react-hooks/commit/982680ab739953cefaa84d4266188ed2128941f2))
* remove useReplicantOnce ([#266](https://github.com/nodecg/react-hooks/issues/266)) ([be12d07](https://github.com/nodecg/react-hooks/commit/be12d07e281670880ec0227fd99667ce52e36d77))
* upgrade to nodecg v2 ([#248](https://github.com/nodecg/react-hooks/issues/248)) ([1af2348](https://github.com/nodecg/react-hooks/commit/1af234840f2662b0ce92a28b76a97faeb1ce281f))

### [0.4.1-2](https://github.com/Hoishin/use-nodecg/compare/v0.4.1-1...v0.4.1-2) (2023-03-15)

### Bug Fixes

-   **deps:** update dependency tslib to v1.11.1 ([#160](https://github.com/Hoishin/use-nodecg/issues/160)) ([11fb8b6](https://github.com/Hoishin/use-nodecg/commit/11fb8b6b67b0accefba57c0a2bae55c0dec096cd))
-   **deps:** update dependency tslib to v2 ([#219](https://github.com/Hoishin/use-nodecg/issues/219)) ([3fbcf13](https://github.com/Hoishin/use-nodecg/commit/3fbcf1374eeaed594a3815297a7d1dee02ffc72e))
-   **deps:** update to react 18 and typescript 4.5 ([#245](https://github.com/Hoishin/use-nodecg/issues/245)) ([4467b7e](https://github.com/Hoishin/use-nodecg/commit/4467b7e310c7890ce4b5dae4f85e08ad2960f970))

## [0.4.1-1](https://github.com/Hoishin/use-nodecg/compare/v0.4.0...v0.4.1-1) (2019-04-30)

### Bug Fixes

-   **useListenFor:** add dependencies to useEffect ([1f9f9bc](https://github.com/Hoishin/use-nodecg/commit/1f9f9bc))
-   **useReplicant:** add replicant as dependency for useEffect ([#7](https://github.com/Hoishin/use-nodecg/issues/7)) ([dc5521a](https://github.com/Hoishin/use-nodecg/commit/dc5521a))

### Features

-   **useReplicant:** allow different type in initialValue ([69b2ffb](https://github.com/Hoishin/use-nodecg/commit/69b2ffb))
-   **useReplicant:** allow initialValue to be different type ([69bd903](https://github.com/Hoishin/use-nodecg/commit/69bd903))
-   **useReplicant:** allow specifying namespace ([#2](https://github.com/Hoishin/use-nodecg/issues/2)) ([cca0df8](https://github.com/Hoishin/use-nodecg/commit/cca0df8)), closes [#1](https://github.com/Hoishin/use-nodecg/issues/1)

# [0.4.0](https://github.com/Hoishin/use-nodecg/compare/v0.3.1-alpha.1...v0.4.0) (2019-03-03)

### Bug Fixes

-   **useReplicant:** shallow copy the value if new value isn't identical ([b042aed](https://github.com/Hoishin/use-nodecg/commit/b042aed))

### Features

-   **esmodule:** output esmodule along with commonjs ([640153d](https://github.com/Hoishin/use-nodecg/commit/640153d))

### BREAKING CHANGES

-   **esmodule:** specifies "module" field in package.json

## [0.3.1-alpha.1](https://github.com/Hoishin/use-nodecg/compare/v0.3.1-alpha.0...v0.3.1-alpha.1) (2018-11-25)

### Features

-   implement useListenFor & useReplicantOnce ([425dade](https://github.com/Hoishin/use-nodecg/commit/425dade))

## [0.3.1-alpha.0](https://github.com/Hoishin/use-nodecg/compare/v0.3.0...v0.3.1-alpha.0) (2018-11-25)

# [0.3.0](https://github.com/Hoishin/use-nodecg/compare/v0.2.0...v0.3.0) (2018-11-25)

### Features

-   **typescript:** Include TypeScript in package ([06d6787](https://github.com/Hoishin/use-nodecg/commit/06d6787))

# [0.2.0](https://github.com/Hoishin/use-nodecg/compare/v0.1.1...v0.2.0) (2018-11-25)

## [0.1.1](https://github.com/Hoishin/use-nodecg/compare/v0.1.0...v0.1.1) (2018-11-25)

### Features

-   **useReplicant:** return setValue to update replicant ([5719882](https://github.com/Hoishin/use-nodecg/commit/5719882))

### BREAKING CHANGES

-   **useReplicant:** The return type is now tuple of value and setValue

# [0.1.0](https://github.com/Hoishin/use-nodecg/compare/v0.1.0-0...v0.1.0) (2018-11-24)

# [0.1.0-0](https://github.com/Hoishin/use-nodecg/compare/v0.0.1-4...v0.1.0-0) (2018-11-24)

### Tests

-   **useReplicant:** Add tests ([94066e7](https://github.com/Hoishin/use-nodecg/commit/94066e7))

### BREAKING CHANGES

-   **useReplicant:** Initial value is now required (pass `undefined` if not needed)

## [0.0.1-4](https://github.com/Hoishin/use-nodecg/compare/v0.0.1-3...v0.0.1-4) (2018-11-24)

### Bug Fixes

-   **engines:** Allow Node v10 LTS ([2ed3200](https://github.com/Hoishin/use-nodecg/commit/2ed3200))

## [0.0.1-3](https://github.com/Hoishin/use-nodecg/compare/v0.0.1-2...v0.0.1-3) (2018-11-24)

### chore

-   specify node engine version ([c3257f1](https://github.com/Hoishin/use-nodecg/commit/c3257f1))

### BREAKING CHANGES

-   Can now use only Node v8.9 or higher

## [0.0.1-2](https://github.com/Hoishin/use-nodecg/compare/v0.0.1-1...v0.0.1-2) (2018-11-24)

## [0.0.1-1](https://github.com/Hoishin/use-nodecg/compare/v0.0.1-0...v0.0.1-1) (2018-11-24)

### Bug Fixes

-   expose useReplicant from index.ts ([479247e](https://github.com/Hoishin/use-nodecg/commit/479247e))

## [0.0.1-0](https://github.com/Hoishin/use-nodecg/compare/16e5e03...v0.0.1-0) (2018-11-24)

### Features

-   implement useReplicant ([16e5e03](https://github.com/Hoishin/use-nodecg/commit/16e5e03))
