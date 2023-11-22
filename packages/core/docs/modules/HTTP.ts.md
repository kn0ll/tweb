---
title: HTTP.ts
nav_order: 4
parent: Modules
---

## HTTP overview

Additional HTTP types.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [types](#types)
  - [Hash (type alias)](#hash-type-alias)
  - [Location (type alias)](#location-type-alias)
  - [Pathname (type alias)](#pathname-type-alias)
  - [Search (type alias)](#search-type-alias)

---

# types

## Hash (type alias)

A hash must begin with `#`.

**Signature**

```ts
export type Hash = `#${string}`
```

Added in v1.0.0

## Location (type alias)

The core type for type-safe routing. Schemas that satisfy the `Location`
type can be used to build links, forms, and routes.

**Signature**

```ts
export type Location = {
  method: Method
  pathname: Pathname
  search: Search | null
}
```

Added in v1.0.0

## Pathname (type alias)

A pathname must begin with `/`.

**Signature**

```ts
export type Pathname = `/${string}`
```

Added in v1.0.0

## Search (type alias)

Search values can only primitively be `string` | `string[]`.

**Signature**

```ts
export type Search = ReadonlyRecord.ReadonlyRecord<string | string[]>
```

Added in v1.0.0
