import { Schema } from "@effect/schema";
import { Effect } from "effect";
import * as React from "react";

import * as Route from "./Route";

/*
route Index
  = GET "/"

route GetSignUp
  = GET "/sign-up"

route SignUp
  = POST "/sign-up"
    username: string
    email: string
    password: string

Index.link
Index.form
GetSignUp.link
GetSignUp.form
SignUp.form
*/

const Doc = ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <nav>
          <ul>
            <li>
              <SignUpLink path="/sign-up" hash={null} search={null} />
            </li>
            <li>
              <LogInLink path="/log-in" hash={null} search={null} />
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </body>
  </html>
);

const getHome = Schema.struct({
  method: Schema.literal("GET"),
  path: Schema.literal("/"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const HomeLink = Route.link(getHome);

export const HomePage = () => (
  <Doc>
    <h1>Home</h1>
  </Doc>
);

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

const getLogIn = Schema.struct({
  method: Schema.literal("GET"),
  path: Schema.literal("/log-in"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const LogInLink = Route.link(getLogIn);

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
