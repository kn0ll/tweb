/**
 * The `Form` module is responsible for binding `Location` schema instances to
 * html forms. This ensures that all forms are type safe.
 *
 * @since 1.0.0
 */

import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP.js";

import { flow } from "effect";
import querystring from "node:querystring";

import * as DOMElement from "./DOMElement.js";

/**
 * A `FormLocation` is a `Location` schema which is constrained to the `GET`
 * method, and an additional `body` property. The `body` property is used
 * for matching routes, and creating type-safe form inputs.
 *
 * @since 1.0.0
 * @category types
 */
export type FormLocation<L extends Location> = L & {
  body: unknown | null;
};

/**
 * Given some `Location`, create a specialized version of form input props,
 * which binds input types to the `Location`.
 *
 * @since 1.0.0
 * @category types
 */
export type FormInputProps<F extends FormLocation<Location>> =
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: keyof ("GET" extends F["method"] ? F["search"] : F["body"]);
  };

/**
 * A `FormInput` is a component which accepts `FormInputProps` for some schema.
 *
 * @since 1.0.0
 * @category types
 */
export type FormInput<F extends FormLocation<Location>> = (
  props: FormInputProps<F>,
) => JSX.Element;

/**
 * `FormRenderProp` defines the signature of the render function accepted
 * by a `Form` component. It provides an `Input` component, which can
 * only be invoked with properties specific to some schema.
 *
 * @since 1.0.0
 * @category types
 */
export type FormRenderProp<F extends FormLocation<Location>> = (
  Input: FormInput<F>,
) => JSX.Element;

/**
 * The props a `Form` component accepts.
 *
 * @since 1.0.0
 * @category types
 */
export type FormProps<F extends FormLocation<Location>> = Omit<F, "body"> & {
  children: FormRenderProp<F>;
};

/**
 * Create an `input` element with some `FormInputProps`.
 *
 * @since 1.0.0
 * @category components
 */
export const FormInput: <F extends FormLocation<Location>>(
  props: FormInputProps<F>,
) => JSX.Element = DOMElement.make("input");

/**
 * Given some `Location` schema, create an HTML form whose props are bound to
 * only valid inputs of the schema.
 *
 * @todo if method is get, accept search config. if method is other, accept body config
 * @todo accept other html props like classname (we do this fine in Link, i just punted this cause of naming conflicts)
 * @since 1.0.0
 * @category constructors
 */
export const make = <L extends Location, Form extends FormLocation<L>, T>(
  schema: Schema.Schema<Form, T>,
) =>
  flow(
    ({ children, ...location }: FormProps<Form>) => ({
      action: [
        location.pathname,
        querystring.encode(location.search || undefined),
      ].join("?"),
      method: location.method,
      children: children(FormInput),
    }),
    DOMElement.make("form"),
  );
