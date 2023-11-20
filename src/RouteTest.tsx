import { Schema } from "@effect/schema";
import * as React from "react";

import * as Route from "./Route";

const foo = Schema.struct({
  method: Schema.union(Schema.literal("GET"), Schema.literal("PUT")),
  path: Schema.literal("/profile"),
  hash: Schema.union(Schema.null, Schema.literal("#description")),
  search: Schema.struct({ username: Schema.string }),
});

const FooLink = Route.link(foo);

<FooLink path="/profile" hash="#description" search={{ username: "foo" }} />;
