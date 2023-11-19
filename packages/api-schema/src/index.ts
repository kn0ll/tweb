import * as RPC from "@effect/rpc";
import { Schema } from "@effect/schema";

export const make = RPC.Schema.make({
  signUp: {
    input: Schema.struct({
      email: Schema.string,
      username: Schema.string,
      password: Schema.string,
    }),
  },
  greet: { input: Schema.string, output: Schema.string },
  currentTime: { output: Schema.dateFromString(Schema.string) },
});
