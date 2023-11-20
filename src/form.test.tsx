import { Schema } from "@effect/schema";
import * as React from "react";

import { form } from "./form";

const updateProfileSchema = Schema.struct({
  method: Schema.literal("PUT"),
  path: Schema.literal("/profile"),
  search: Schema.struct({ id: Schema.string }),
  body: Schema.struct({ username: Schema.string, description: Schema.string }),
});

const UpdateProfileForm = form(updateProfileSchema);

<UpdateProfileForm method="PUT" path="/profile" search={{ id: "foo" }}>
  {() => <p>hello world</p>}
</UpdateProfileForm>;

// @ts-expect-error: should fail because it's not POST page
<UpdateProfileForm method="POST" path="/profile" search={{ id: "foo" }}>
  {() => <p>hello world</p>}
</UpdateProfileForm>;
