/**
 * High level utilities for creating HTTP servers from `tweb` types.
 *
 * @since 1.0.0
 */

import type { ListenOptions } from "node:net";

import { server } from "@effect/platform-node/HttpServer";
import { Effect, flow } from "effect";
import { createServer } from "node:http";

/**
 * Given an `App` and a server configuration,
 * start an HTTP server.
 *
 * This function is useful for quickly creating a server with sane defaults.
 * But you may consider ejecting from this function when you require
 * more robust scoping, layers, or error handling.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = (options: ListenOptions) =>
  flow(
    server.serve(),
    Effect.scoped,
    Effect.provide(server.layer(createServer, options)),
    Effect.catchAllCause(Effect.logError),
    Effect.withSpan("Server.make"),
  );
