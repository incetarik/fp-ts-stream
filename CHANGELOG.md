# Changelog
This file contains the changes made to the package

This sections are in descending order of the change date.

## [0.1.9] - 2022-09-30
### Changes

Updated types to provide `async` functions

Now the following functions may also take functions that
return `Promise` for their results:
- `comprehension`
- `dropRightWhile`
- `findFirstMap`
- `findLastMap`
- `flap`
- `tail`
- `apSeq`
- `ap`
- `filterMapWithIndex`
- `filterMap`
- `partitionMap`
- `partitionMapWithIndex`
- `unfold`


Likewise the following instance implementations are updated:

- `ApplicativeSeq`
- `Applicative`
- `Filterable`
- `Unfoldable`


## [0.1.0] - 2022-09-26
Added initial commit

[0.1.9]: https://github.com/incetarik/fp-ts-stream/compare/0.1.8...0.1.9
[0.1.0]: https://github.com/incetarik/fp-ts-stream
