import { Schema } from "@effect/schema";
import { pipe } from "effect";

import { link } from "./link";

const linkSchema = Schema.struct({
  path: Schema.literal("/profile"),
  hash: Schema.union(Schema.null, Schema.literal("#description")),
  search: Schema.struct({ username: Schema.string }),
});

// can create a basic link
link(
  pipe(
    linkSchema,
    Schema.extend(Schema.struct({ method: Schema.literal("GET") })),
  ),
);

// accepts links with GET in union
link(
  pipe(
    linkSchema,
    Schema.extend(
      Schema.struct({
        method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
      }),
    ),
  ),
);
