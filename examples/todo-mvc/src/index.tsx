import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";
import { Router } from "tweb";

import HomePage from "./routes/HomePage.js";
import SignUpForm from "./routes/SignUpForm.js";
import SignUpPage from "./routes/SignUpPage.js";

pipe(
  Router.make([HomePage, SignUpPage, SignUpForm]),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
