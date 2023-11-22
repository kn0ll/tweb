---
title: core/src/Server.ts
nav_order: 8
parent: Modules
---

## Server overview

High level utilities for creating HTTP servers from `tweb` types.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)

---

# constructors

## make

Given an `App` and a server configuration,
start an HTTP server.

This function is useful for quickly creating a server with sane defaults.
But you may consider ejecting from this function when you require
more robust scoping, layers, or error handling.

**Signature**

```ts
export declare const make: (
  options: ListenOptions
) => <R, E>(
  httpApp: Default<R, E>
) => Effect.Effect<
  Exclude<Exclude<Exclude<Exclude<R, ServerRequest>, Scope>, server.Server | Platform>, ParentSpan>,
  never,
  void
>
```

Added in v1.0.0
