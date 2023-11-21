/**
 * High level utilities for creating HTTP servers using `tweb` types.
 */

import type { Location } from "./HTTP.js";
import type { Router } from "./Router.js";

import * as Http from "@effect/platform-node/HttpServer";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";
import * as Net from "node:net";

import * as App from "./App.js";

/**
 * Given a list of routes and a server configuration,
 * create a a server and start listening.
 *
 * This function is useful for quickly creating a server with sane defaults.
 * But you may consider ejecting from this function when you require
 * more robust scoping, layers, or error handling.
 *
 * @category constructors
 */
export const make =
  <R, E, A extends Location>(router: Router<R, E, A>) =>
  (options: Net.ListenOptions) =>
  () =>
    pipe(
      App.make(router),
      Http.server.serve(),
      Effect.scoped,
      Effect.provide(Http.server.layer(createServer, options)),
      Effect.catchAllCause(Effect.logError),
      Effect.withSpan("Server.make"),
    );
