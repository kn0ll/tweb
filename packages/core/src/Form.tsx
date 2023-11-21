import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP.js";

import { flow } from "effect";
import * as React from "react";

import * as DOMElement from "./DOMElement.js";

/**
 * @category types
 */
export type FormLocation<L extends Location> = L & {
  body: unknown | null;
};

/**
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
 * @category types
 */
export type FormInput<F extends FormLocation<Location>> = (
  props: FormInputProps<F>,
) => JSX.Element;

/**
 * @category types
 */
export type FormRenderProp<F extends FormLocation<Location>> = (
  Input: FormInput<F>,
) => JSX.Element;

/**
 * @category types
 */
export type FormProps<F extends FormLocation<Location>> = Omit<F, "body"> & {
  children: FormRenderProp<F>;
};

/**
 * @category components
 */
export const FormInput = <F extends FormLocation<Location>>(
  props: FormInputProps<F>,
) => <input {...props} />;

/**
 * TODO: if method is get, accept search config. if method is other, accept body config
 * @category constructors
 */
export const make = <L extends Location, Form extends FormLocation<L>>(
  schema: Schema.Schema<Form>,
) =>
  flow(
    ({ children, ...location }: FormProps<Form>) => ({
      action: [location.pathname, location.search].join(""),
      method: location.method,
      children: children(FormInput),
    }),
    DOMElement.make("form"),
  );
