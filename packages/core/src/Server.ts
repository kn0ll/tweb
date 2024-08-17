/**
 * High level utilities for creating HTTP servers from `tweb` types.
 *
 * @since 0.0.1
 */

import type { ListenOptions } from "node:net";
import type { HttpApp } from "@effect/platform";

import { createServer } from "node:http";
import { HttpServer } from "@effect/platform";
import { NodeHttpServer } from "@effect/platform-node";
import { Effect, Layer, pipe } from "effect";

/**
 * Given an `App` and a server configuration,
 * start an HTTP server.
 *
 * This function is useful for quickly creating a server with sane defaults.
 * But you may consider ejecting from this function when you require
 * more robust scoping, layers, or error handling.
 *
 * @since 0.0.1
 * @category constructors
 */
export const make =
	(options: ListenOptions) =>
	<E, R>(httpApp: HttpApp.Default<E, R>) =>
		pipe(
			HttpServer.serve(httpApp),
			Layer.provide(NodeHttpServer.layer(createServer, options)),
			Layer.launch,
			Effect.catchAllCause(Effect.logError),
		);
