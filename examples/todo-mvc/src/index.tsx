import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";
import * as React from "react";
import { Form, Link, Route, Router } from "tweb";

const Doc = ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <h1>
          <HomePageLink pathname="/" hash={null} search={null}>
            Logo
          </HomePageLink>
        </h1>
        <nav>
          <ul>
            <li>
              <SignUpLink pathname="/sign-up" hash={null} search={null}>
                Sign Up
              </SignUpLink>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </body>
  </html>
);

// TODO: make handler which accepts a schema and exports { Link, Form } or { Form }

const homePageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  hash: Schema.null,
});

const HomePageLink = Link.make(homePageSchema);

const homePage = Route.page(homePageSchema, ({ method, pathname }) => (
  <Doc>
    <h1>
      Home ({method} {pathname})
    </h1>
  </Doc>
));

const signUpPageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/sign-up"),
  search: Schema.null,
  hash: Schema.null,
});

const SignUpLink = Link.make(signUpPageSchema);

const signUpPage = Route.page(signUpPageSchema, () => (
  <Doc>
    <h1>Sign Up</h1>
    {/* 1. probably need to accept same props as link. ie method="GET" (we can use this to determine what Input provides, query or body)
    2. on that notes, query will need to be set on `action` by us... */}
    <SignUpForm method="POST" pathname="/sign-up" search={null}>
      {(Input) => (
        <>
          <label htmlFor="username">Username</label>
          <Input type="text" name="username" id="username" />
          <label htmlFor="email">Email</label>
          <Input type="text" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          <input type="submit" />
          {/* <Input type="submit" />  */}
        </>
      )}
    </SignUpForm>
  </Doc>
));

const signUpFormSchema = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/sign-up"),
  search: Schema.null,
  body: Schema.struct({
    username: Schema.string,
    password: Schema.string,
    email: Schema.string,
  }),
});

const SignUpForm = Form.make(signUpFormSchema);

// TODO: need to parse body...
const signUpForm = Route.make(signUpFormSchema, () =>
  pipe("Sign Up Form", ServerResponse.text, Effect.succeed),
);

pipe(
  Router.make([homePage, signUpPage, signUpForm]),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
