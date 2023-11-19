import { Schema } from "@effect/schema";
import { Effect } from "effect";

import * as Route from "./Route";

const getIndex = Schema.struct({
  method: Schema.literal("GET"),
  path: Schema.literal("/"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const IndexLink = Route.link(getIndex);

const getSignUp = Schema.struct({
  method: Schema.literal("GET"),
  path: Schema.literal("/sign-up"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const SignUpLink = Route.link(getSignUp);

const postSignUp = Schema.struct({
  method: Schema.literal("POST"),
  path: Schema.literal("/sign-up"),
  hash: Schema.null,
  search: Schema.null,
  body: Schema.struct({
    username: Schema.string,
    email: Schema.string,
    password: Schema.string,
  }),
});

export const SignUpForm = Route.form(postSignUp)("POST", {
  username: "Foo",
  email: "Foo",
  password: "Foo",
});

// const indexSchema = Schema.struct({
//   method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
//   path: Schema.literal("/"),
//   hash: Schema.null,
//   search: Schema.struct({ username: Schema.string }),
//   body: Schema.null,
// });

// export const handler = Route.handler(indexRouteSchema)(() => Effect.succeed(2));

// export const link = Link({
//   path: "/",
//   hash: null,
//   search: { username: "Foo" },
//   children: "Text For Link",
// });

// export const Form = Route.form(indexRouteSchema)("GET", { username: "Foo" });

// // TODO: how to POST if it has a search tho :() (maybe depend on Link? we need to accept all the same 4 props....)
// export const Form2 = Route.form(indexRouteSchema)("POST", null);

// const crazyRouteSchema = Schema.struct({
//   method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
//   path: Schema.literal("/foo/bar"),
//   hash: Schema.literal("#foo"),
//   search: Schema.struct({ username: Schema.string }),
//   body: Schema.null,
// });

// const CrazyLink = Route.link(crazyRouteSchema);

// const link2 = CrazyLink({
//   path: "/foo/bar",
//   hash: "#foo",
//   search: { username: "foo" },
//   children: "Text For Link",
// });
