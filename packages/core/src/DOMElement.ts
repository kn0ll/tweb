/**
 * Methods for interacting with JSX elements. Ideally this module would provide
 * a DOM service, so that we can abstract the React implementation details.
 *
 * @since 0.0.1
 */

import type { ClassAttributes, DOMAttributes } from "react";

import { HttpServerResponse } from "@effect/platform";
import { flow } from "effect";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

/**
 * A functional wrapper for `React.createElement`.
 *
 * @todo i think we're losing `R` here which is important :o
 * @since 0.0.1
 * @category constructors
 */
export const make =
	<P extends DOMAttributes<T>, T extends Element>(type: string) =>
	(props?: (ClassAttributes<T> & P) | null) =>
		createElement(type, props);

/**
 * An alias for `ReactDOM.renderToString`. Kind of useless, but emulates the
 * DOM service API we should be providing.
 *
 * @since 0.0.1
 * @category lifting
 */
export const string = renderToString;

/**
 * Given some JSX element, create a `ServerResponse` for it's HTML.
 *
 * @since 0.0.1
 * @category lifting
 */
export const serverResponse = flow(
	string,
	HttpServerResponse.raw,
	HttpServerResponse.setHeader("Content-Type", "text/html"),
);
