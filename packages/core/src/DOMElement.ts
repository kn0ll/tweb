import type { ClassAttributes, DOMAttributes } from "react";

import { raw, setHeader } from "@effect/platform/Http/ServerResponse";
import { flow } from "effect";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

/**
 * TODO: i think we're losing `R` here which is important :o
 * @category constructors
 */
export const make =
  <P extends DOMAttributes<T>, T extends Element>(type: string) =>
  (props?: (ClassAttributes<T> & P) | null) =>
    createElement(type, props);

export const string = renderToString;

export const serverResponse = flow(
  string,
  raw,
  setHeader("Content-Type", "text/html"),
);
