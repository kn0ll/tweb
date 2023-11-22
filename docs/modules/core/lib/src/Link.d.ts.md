---
title: core/lib/src/Link.d.ts
nav_order: 6
parent: Modules
---

## Link.d overview

The `Link` module is responsible for binding `Location` schema instances to
html anchors. This ensures that all links are type safe.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [types](#types)
  - [AnchorProps (type alias)](#anchorprops-type-alias)
  - [LinkLocation (type alias)](#linklocation-type-alias)
  - [LinkProps (type alias)](#linkprops-type-alias)

---

# types

## AnchorProps (type alias)

These are all the props that can be proxied directly to an anchor element.
The `href` property will derived from the given `Location`.

**Signature**

```ts
export type AnchorProps = React.PropsWithChildren &
  Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href">
```

Added in v1.0.0

## LinkLocation (type alias)

A `LinkLocation` is a `Location` schema which is constrained to the `GET`
method, and an additional `hash` property. The `hash` property is not used
during routing, but it can be used to help create type-safe identifiers for
elements.

**Signature**

```ts
export type LinkLocation<L extends Location> = "GET" extends L["method"]
  ? L & {
      hash: Hash | null
    }
  : never
```

Added in v1.0.0

## LinkProps (type alias)

`AnchorProps` with an additional `Location` property required to compute
a `href`. The reason we need to explicitly accept things like `pathname`
and we can't derive it from the schema, is because a `Location` schema may
have a `pathname` which is not a static string. For example, if a routes
pathname is the union of two strings, the developer must arbitrate which
pathname we want to use.

**Signature**

```ts
export type LinkProps<P extends LinkLocation<Location>> = AnchorProps & {
  pathname: P["pathname"]
  hash: P["hash"]
  search: P["search"]
}
```

Added in v1.0.0
