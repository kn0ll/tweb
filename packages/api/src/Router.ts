import { Router, Server } from "@effect/rpc";

import currentTime from "./routes/currentTime/Handler.js";
import greet from "./routes/greet/Handler.js";
import * as Schema from "./Schema.js";

export const handler = Server.handler(
  Router.make(Schema.make, {
    greet,
    currentTime,
  }),
);
