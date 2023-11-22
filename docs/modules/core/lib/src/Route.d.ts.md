---
title: core/lib/src/Route.d.ts
nav_order: 7
parent: Modules
---

## Route.d overview

A `Route` is the core primitive of our HTTP server,
and binding `Location` schema instances to HTTP handlers.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [types](#types)
  - [Route (type alias)](#route-type-alias)

---

# types

## Route (type alias)

A `Route` is a pair of `Location` schema `A`,
and a handler which accepts the parsed `A` as an argument.

**Signature**

```ts
export type Route<R, E, A extends Location, T> = readonly [
  schema: Schema.Schema<A, T>,
  handler: (a: T) => Effect.Effect<R, E, ServerResponse>
]
```

Added in v1.0.0
