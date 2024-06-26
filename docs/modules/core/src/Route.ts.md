---
title: core/src/Route.ts
nav_order: 7
parent: Modules
---

## Route overview

A `Route` is the core primitive of our HTTP server,
and binding `Location` schema instances to HTTP handlers.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [types](#types)
  - [Route (type alias)](#route-type-alias)

---

# constructors

## make

Create a `Route` from a schema and a handler.
Even though a `Route` is only a tuple, this constructor is used
for type inference, passing the resulting `A` from the input schema
as an argument to the handler.

**Signature**

```ts
export declare const make: <R, E, A extends Location, T>(
  schema: Schema.Schema<A, T>,
  handler: (a: T) => Effect.Effect<R, E, ServerResponse>
) => Route<R, E, A, T>
```

Added in v1.0.0

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
