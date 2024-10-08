/**
 * Additional HTTP types.
 *
 * @since 0.0.1
 */

import type { HttpMethod } from "@effect/platform";
import type { Record } from "effect";

/**
 * A pathname must begin with `/`.
 *
 * @since 0.0.1
 * @category types
 */
export type Pathname = `/${string}`;

/**
 * A hash must begin with `#`.
 *
 * @since 0.0.1
 * @category types
 */
export type Hash = `#${string}`;

/**
 * Search values can only primitively be `string | string[]`.
 *
 * @since 0.0.1
 * @category types
 */
export type Search = Readonly<Record<string, string | string[]>>;

/**
 * The core type for type-safe routing. Schemas that satisfy the `Location`
 * type can be used to build links, forms, and routes.
 *
 * @since 0.0.1
 * @category types
 */
export type Location = {
	method: HttpMethod.HttpMethod;
	pathname: Pathname;
	search: Search | null;
};
