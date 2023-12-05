# Changelog

## 0.6.2 (2023-09-04)


### ⚠ BREAKING CHANGES

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add types for states ([55048e1](https://github.com/TimothyJones/ContractCaseTest/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/TimothyJones/ContractCaseTest/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))


### Bug Fixes

* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/TimothyJones/ContractCaseTest/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Export MatchContextByExact ([88cc4ae](https://github.com/TimothyJones/ContractCaseTest/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/TimothyJones/ContractCaseTest/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))


### Miscellaneous Chores

* release 0.5.1 ([4ee5bcb](https://github.com/TimothyJones/ContractCaseTest/commit/4ee5bcb37e6dbca84b05f9a769e736fd0600f84e))
* release 0.6.1 ([d34ee95](https://github.com/TimothyJones/ContractCaseTest/commit/d34ee95ee53765f4184076fde1b32720d5f5db3b))
* release 0.6.2 ([de6504e](https://github.com/TimothyJones/ContractCaseTest/commit/de6504e8021a17a0b09259efb183cdc83cfe3ca3))


### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/TimothyJones/ContractCaseTest/commit/d6bc4dda780f1836b18640b49882115edee19c42))
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/TimothyJones/ContractCaseTest/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.12.1](https://github.com/TimothyJones/ContractCaseTest/compare/@contract-case/case-entities-internal-v0.12.0...@contract-case/case-entities-internal-v0.12.1) (2023-05-19)


### Miscellaneous Chores

* **@contract-case/case-entities-internal:** Synchronize ContractCase Core versions

## [0.12.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-entities-internal-v0.11.0...@contract-case/case-entities-internal-v0.12.0) (2023-05-17)


### Miscellaneous Chores

* **@contract-case/case-entities-internal:** Synchronize ContractCase Core versions

## [0.11.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-entities-internal-v0.11.0...@contract-case/case-entities-internal-v0.11.0) (2023-05-09)


### Miscellaneous Chores

* **@contract-case/case-entities-internal:** Synchronize ContractCase Core versions

## [0.11.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-entities-internal-v0.10.0...@contract-case/case-entities-internal-v0.11.0) (2023-05-08)


### ⚠ BREAKING CHANGES

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package

### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/case-contract-testing/case/commit/d6bc4dda780f1836b18640b49882115edee19c42))

## [0.10.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-entities-internal-v0.9.1...@contract-case/case-entities-internal-v0.10.0) (2023-05-06)


### ⚠ BREAKING CHANGES

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))


### Bug Fixes

* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.9.1](https://github.com/case-contract-testing/case/compare/@contract-case/case-entities-internal-v0.9.0...@contract-case/case-entities-internal-v0.9.1) (2023-05-03)


### Features

* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))


### Bug Fixes

* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))

## [0.9.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-entities-internal-v0.8.0...@contract-case/case-entities-internal-v0.9.0) (2023-04-26)


### ⚠ BREAKING CHANGES

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))


### Bug Fixes

* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.8.0](https://github.com/case-contract-testing/case/compare/case-entities-internal-v0.7.0...case-entities-internal-v0.8.0) (2023-04-19)


### ⚠ BREAKING CHANGES

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))


### Bug Fixes

* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))
