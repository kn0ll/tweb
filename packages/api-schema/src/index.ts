import * as RPC from "@effect/rpc";
import { Schema } from "@effect/schema";

export const make = RPC.Schema.make({
  greet: { input: Schema.string, output: Schema.string },
  currentTime: { output: Schema.dateFromString(Schema.string) },
});
