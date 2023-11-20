import { Schema } from "@effect/schema";
import { pipe } from "effect";
import * as React from "react";

import * as Route from "./Route";

const linkSchema = Schema.struct({
  path: Schema.literal("/profile"),
  hash: Schema.union(Schema.null, Schema.literal("#description")),
  search: Schema.struct({ username: Schema.string }),
});

// can create a basic link
Route.link(
  pipe(
    linkSchema,
    Schema.extend(Schema.struct({ method: Schema.literal("GET") })),
  ),
);

// accepts links with GET in union
Route.link(
  pipe(
    linkSchema,
    Schema.extend(
      Schema.struct({
        method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
      }),
    ),
  ),
);

// denies links without GET
Route.link(
  // @ts-expect-error: should fail because we can't link to a POST page
  pipe(
    linkSchema,
    Schema.extend(Schema.struct({ method: Schema.literal("POST") })),
  ),
);

const updateProfileSchema = Schema.struct({
  method: Schema.literal("PUT"),
  path: Schema.literal("/profile"),
  search: Schema.struct({ id: Schema.string }),
  body: Schema.struct({ username: Schema.string, description: Schema.string }),
});

const UpdateProfileForm = Route.form(updateProfileSchema);

<UpdateProfileForm method="PUT" path="/profile" search={{ id: "foo" }}>
  {() => <p>hello world</p>}
</UpdateProfileForm>;

// @ts-expect-error: should fail because it's not POST page
<UpdateProfileForm method="POST" path="/profile" search={{ id: "foo" }}>
  {() => <p>hello world</p>}
</UpdateProfileForm>;
