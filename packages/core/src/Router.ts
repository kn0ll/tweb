import type { Location } from "./HTTP.js";
import type { Route } from "./Route.js";

import { ReadonlyArray } from "effect";

export type Router<R, E, A extends Location> = Route<R, E, A>[];

export const make = <A extends Location>(
  initial: Route<never, never, A>[] = [],
) => initial;

export const add =
  <OR, OE, OA extends Location>(route: Route<OR, OE, OA>) =>
  <R, E, A extends Location>(self: Route<R, E, A>[]) =>
    ReadonlyArray.append(self, route) as Router<R | OR, E | OE, A | OA>;
