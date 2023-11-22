---
title: core/src/App.ts
nav_order: 1
parent: Modules
---

## App overview

An `@effect/platform` app is a type extending
`Effect.Effect<ServerRequest, E, ServerResponse>`.

This app satisfies the same type, but is constructed using a `tweb`
[Route](./Route.ts) list.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [lifting](#lifting)
  - [requestToLocation](#requesttolocation)

---

# constructors

## make

Given a [Route](./Route.ts) list, construct an `@effect/platform` app.
This works is by pattern matching the request against the input
[Route](./Route.ts) schemas.

One implication of this is that the order of your routes matters:
the first route that matches will be the one whose handler executed.

**Signature**

```ts
export declare const make: <R, E>(routes: Route.Route<R, E, any, any>[]) => Default<R, RequestError | E | ParseError[]>
```

Added in v1.0.0

# lifting

## requestToLocation

Given a `ServerRequest`, format it as a `Location` suitable for pattern
matching.

**Signature**

```ts
export declare const requestToLocation: ({
  url,
  method,
  urlParamsBody
}: ServerRequest.ServerRequest) => Effect.Effect<
  never,
  RequestError,
  { method: Method; pathname: string; search: querystring.ParsedUrlQuery | null; body: Record<string, string> }
>
```

Added in v1.0.0
