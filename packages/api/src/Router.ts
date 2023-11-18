import { Router, Server } from "@effect/rpc";
import * as Schema from "@rpphub/api-schema";

import currentTime from "./routes/currentTime.js";
import greet from "./routes/greet.js";

export const make = Router.make(Schema.make, {
  greet,
  currentTime,
});

export const handler = Server.handler(make);
