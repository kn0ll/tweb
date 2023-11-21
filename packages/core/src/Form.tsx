import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP.js";

import * as React from "react";

export type FormLocation<L extends Location> = L & {
  body: unknown | null;
};

export type FormInputProps<F extends FormLocation<Location>> =
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: keyof ("GET" extends F["method"] ? F["search"] : F["body"]);
  };

export type FormInput<F extends FormLocation<Location>> = (
  props: FormInputProps<F>,
) => JSX.Element;

export type FormRenderProp<F extends FormLocation<Location>> = (
  Input: FormInput<F>,
) => JSX.Element;

export type FormProps<F extends FormLocation<Location>> = Omit<F, "body"> & {
  children: FormRenderProp<F>;
};

export const FormInput = <F extends FormLocation<Location>>(
  props: FormInputProps<F>,
) => <input {...props} />;

// if method is get, accept search config. if method is other, accept body config
export const make =
  <L extends Location, Form extends FormLocation<L>>(
    schema: Schema.Schema<Form>,
  ) =>
  ({ children, ...location }: FormProps<Form>) => (
    <form
      action={[location.pathname, location.search].join("")}
      method={location.method}
    >
      {children(FormInput)}
    </form>
  );
