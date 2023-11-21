import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";
import { Router } from "tweb";

import { homePageRoute } from "./routes/HomePage.js";
import { signUpFormRoute } from "./routes/SignUpForm.js";
import { signUpPageRoute } from "./routes/SignUpPage.js";

pipe(
  Router.make([homePageRoute, signUpFormRoute, signUpPageRoute]),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
