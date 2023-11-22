---
title: core/lib/src/Form.d.ts
nav_order: 3
parent: Modules
---

## Form.d overview

The `Form` module is responsible for binding `Location` schema instances to
html forms. This ensures that all forms are type safe.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [types](#types)
  - [FormInput (type alias)](#forminput-type-alias)
  - [FormInputProps (type alias)](#forminputprops-type-alias)
  - [FormLocation (type alias)](#formlocation-type-alias)
  - [FormProps (type alias)](#formprops-type-alias)
  - [FormRenderProp (type alias)](#formrenderprop-type-alias)

---

# types

## FormInput (type alias)

A `FormInput` is a component which accepts `FormInputProps` for some schema.

**Signature**

```ts
export type FormInput<F extends FormLocation<Location>> = (props: FormInputProps<F>) => JSX.Element
```

Added in v1.0.0

## FormInputProps (type alias)

Given some `Location`, create a specialized version of form input props,
which binds input types to the `Location`.

**Signature**

```ts
export type FormInputProps<F extends FormLocation<Location>> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: keyof ("GET" extends F["method"] ? F["search"] : F["body"])
}
```

Added in v1.0.0

## FormLocation (type alias)

A `FormLocation` is a `Location` schema which is constrained to the `GET`
method, and an additional `body` property. The `body` property is used
for matching routes, and creating type-safe form inputs.

**Signature**

```ts
export type FormLocation<L extends Location> = L & {
  body: unknown | null
}
```

Added in v1.0.0

## FormProps (type alias)

The props a `Form` component accepts.

**Signature**

```ts
export type FormProps<F extends FormLocation<Location>> = Omit<F, "body"> & {
  children: FormRenderProp<F>
}
```

Added in v1.0.0

## FormRenderProp (type alias)

`FormRenderProp` defines the signature of the render function accepted
by a `Form` component. It provides an `Input` component, which can
only be invoked with properties specific to some schema.

**Signature**

```ts
export type FormRenderProp<F extends FormLocation<Location>> = (Input: FormInput<F>) => JSX.Element
```

Added in v1.0.0
