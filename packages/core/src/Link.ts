/**
 * The `Link` module is responsible for binding `Location` schema instances to
 * html anchors. This ensures that all links are type safe.
 *
 * @since 1.0.0
 */

import type { Schema } from "@effect/schema";
import type { Hash, Location } from "./HTTP.js";

import { flow } from "effect";
import * as DOMElement from "./DOMElement.js";

/**
 * A `LinkLocation` is a `Location` schema which is constrained to the `GET`
 * method, and an additional `hash` property. The `hash` property is not used
 * during routing, but it can be used to help create type-safe identifiers for
 * elements.
 *
 * @since 1.0.0
 * @category types
 */
export type LinkLocation<L extends Location> = "GET" extends L["method"]
	? L & {
			hash: Hash | null;
		}
	: never;

/**
 * These are all the props that can be proxied directly to an anchor element.
 * The `href` property will derived from the given `Location`.
 *
 * @since 1.0.0
 * @category types
 */
export type AnchorProps = React.PropsWithChildren &
	Omit<
		React.DetailedHTMLProps<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
		"href"
	>;

/**
 * `AnchorProps` with an additional `Location` property required to compute
 * a `href`. The reason we need to explicitly accept things like `pathname`
 * and we can't derive it from the schema, is because a `Location` schema may
 * have a `pathname` which is not a static string. For example, if a routes
 * pathname is the union of two strings, the developer must arbitrate which
 * pathname we want to use.
 *
 * @since 1.0.0
 * @category types
 */
export type LinkProps<P extends LinkLocation<Location>> = AnchorProps & {
	pathname: P["pathname"];
	hash: P["hash"];
	search: P["search"];
};

/**
 * Given some `Location` schema, create an HTML anchor element whose props are
 * bound to only valid inputs of the schema.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = <L extends Location, P extends LinkLocation<L>>(
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
