import type { Schema } from "@effect/schema";
import type { Hash, Location } from "./HTTP.js";

import { pipe } from "effect";

import * as DOMElement from "./DOMElement.js";

/**
 * @category types
 */
type HTTPLink<L extends Location> = "GET" extends L["method"]
  ? L & {
      hash: Hash | null;
    }
  : never;

/**
 * @category constructors
 */
export const make =
  <L extends Location, P extends HTTPLink<L>>(
    _schema: "GET" extends P["method"] ? Schema.Schema<P> : never,
  ) =>
  ({
    pathname,
    hash,
    search,
    children,
    ...props
  }: React.PropsWithChildren &
    Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      "href"
    > & {
      pathname: P["pathname"];
      hash: P["hash"];
      search: P["search"];
    }) =>
    pipe(
      Object.assign({}, props, {
        href: [pathname, search, hash].join(""),
        children,
      }),
      DOMElement.make("a"),
    );
