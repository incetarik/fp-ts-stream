# Streams for `fp-ts` 

This library provides `Stream` and `AsyncStream` type classes which uses
`Generator` and `AsyncGenerator` internally, therefore enabling the developers
to have _transducers_, that are executed as much as they are used. See the
following example:

```ts
import { range, filter, map, take } from 'fp-ts-stream/Stream'
import { pipe } from 'fp-ts'

// The following will only run/execute the `range` iterator only 4 times.
//
// No array will be allocated, until `toArray` and the rest of the iteration
// will be skipped/not completed.
pipe(
  range(0, 10000),            // iterates 4 times
  filter(it => it % 2 == 1),  // iterates 2 times
  map(it => it * 3),          // ...
  take(2),                    // ...
  toArray,                    // executed once
  console.log
)

```

The `Stream` is implementing all the functions that an array would normally
have, therefore the instances of it admit implementations such as `Traversable`,
`Chain` and etc.

---
# Support
To support the project, you can send donations to following addresses:

```md
- Bitcoin     : bc1qtut2ss8udkr68p6k6axd0na6nhvngm5dqlyhtn
- Bitcoin Cash: qzmmv43ztae0tfsjx8zf4wwnq3uk6k7zzgcfr9jruk
- Ether       : 0xf542BED91d0218D9c195286e660da2275EF8eC84
```
