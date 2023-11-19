import { Router, Server } from "@effect/rpc";
import * as Schema from "@rpphub/api-schema";

import currentTime from "./routes/currentTime.js";
import greet from "./routes/greet.js";
import signUp from "./routes/signUp.js";

export const make = Router.make(Schema.make, {
  greet,
  currentTime,
  signUp,
});

export const handler = Server.handler(make);
