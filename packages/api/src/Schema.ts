import * as RPC from "@effect/rpc";

import currentTime from "./routes/currentTime/Schema.js";
import greet from "./routes/greet/Schema.js";

export const make = RPC.Schema.make({
  greet,
  currentTime,
});
