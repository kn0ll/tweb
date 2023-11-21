import type { Schema } from "@effect/schema";
import type { Hash, Location } from "./HTTP.js";

import { flow } from "effect";

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
 * @category types
 */
type AnchorProps = React.PropsWithChildren &
  Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  >;

/**
 * @category types
 */
type LinkProps<P extends HTTPLink<Location>> = AnchorProps & {
  pathname: P["pathname"];
  hash: P["hash"];
  search: P["search"];
};

/**
 * @category constructors
 */
export const make = <L extends Location, P extends HTTPLink<L>>(
  schema: "GET" extends P["method"] ? Schema.Schema<P> : never,
) =>
  flow(
    ({ pathname, hash, search, children, ...props }: LinkProps<P>) =>
      Object.assign({}, props, {
        href: [pathname, search, hash].join(""),
        children,
      }),
    DOMElement.make("a"),
  );
