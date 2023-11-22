---
title: core/src/DOMElement.ts
nav_order: 2
parent: Modules
---

## DOMElement overview

Methods for interacting with JSX elements. Ideally this module would provide
a DOM service, so that we can abstract the React implementation details.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [lifting](#lifting)
  - [serverResponse](#serverresponse)
  - [string](#string)

---

# constructors

## make

A functional wrapper for `React.createElement`.

**Signature**

```ts
export declare const make: <P extends DOMAttributes<T>, T extends Element>(
  type: string
) => (props?: (ClassAttributes<T> & P) | null | undefined) => DOMElement<ClassAttributes<T> & P, T>
```

Added in v1.0.0

# lifting

## serverResponse

Given some JSX element, create a `ServerResponse` for it's HTML.

**Signature**

```ts
export declare const serverResponse: (element: ReactElement<any, string | JSXElementConstructor<any>>) => ServerResponse
```

Added in v1.0.0

## string

An alias for `ReactDOM.renderToString`. Kind of useless, but emulates the
DOM service API we should be providing.

**Signature**

```ts
export declare const string: typeof renderToString
```

Added in v1.0.0
