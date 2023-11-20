import { Schema } from "@effect/schema";
import * as React from "react";

import * as Route from "./Route";

const Doc = ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <nav>
          <ul>
            <li>
              <SignUpLink path="/sign-up" hash={null} search={null} />
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

export const SignUpPage = () => (
  <Doc>
    <h1>Sign Up</h1>
    {/* 1. probably need to accept same props as link. ie method="GET" (we can use this to determine what Input provides, query or body) */}
    {/* 2. on that notes, query will need to be set on `action` by us... */}
    {/* 3. these are all strings so we might need to map everything... */}
    <SignUpForm>
      {({ Input }) => (
        <>
          <label htmlFor="username">Username</label>
          <Input type="text" name="username" id="username" />
          <label htmlFor="email">Email</label>
          <Input type="text" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          <Input type="submit" />
        </>
      )}
    </SignUpForm>
  </Doc>
);
