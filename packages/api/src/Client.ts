import { Client, Resolver } from "@effect/rpc";

import * as Router from "./Router.js";
import * as Schema from "./Schema.js";

// TODO: this is a "direct" client but we need an HTTP client prolly like https://github.com/Effect-TS/rpc/blob/main/packages/http/examples/client.ts
//       i guess the person consuming the client should be responsible? but we can provider a helper?
export const make = () =>
  Client.make(Schema.make, Resolver.make(Router.handler));
