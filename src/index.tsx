import { Schema } from "@effect/schema";
import * as React from "react";

import { make } from "./Form";
import { make } from "./Link";

const Doc = ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <nav>
          <ul>
            <li>
              <SignUpLink pathname="/sign-up" hash={null} search={null} />
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
  pathname: Schema.literal("/"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const HomeLink = make(getHome);

export const HomePage = () => (
  <Doc>
    <h1>Home</h1>
  </Doc>
);

const getSignUp = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/sign-up"),
  hash: Schema.any,
  search: Schema.any,
  body: Schema.any,
});

export const SignUpLink = make(getSignUp);

const postSignUp = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/sign-up"),
  hash: Schema.null,
  search: Schema.null,
  body: Schema.struct({
    username: Schema.string,
    email: Schema.string,
    password: Schema.string,
  }),
});

export const SignUpForm = make(postSignUp);

export const SignUpPage = () => (
  <Doc>
    <h1>Sign Up</h1>
    {/* 1. probably need to accept same props as link. ie method="GET" (we can use this to determine what Input provides, query or body) */}
    {/* 2. on that notes, query will need to be set on `action` by us... */}
    <SignUpForm method="POST" pathname="/sign-up" hash={null} search={null}>
      {(Input) => (
        <>
          <label htmlFor="username">Username</label>
          <Input type="text" name="username" id="username" />
          <label htmlFor="email">Email</label>
          <Input type="text" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          {/* <Input type="submit" /> */}
        </>
      )}
    </SignUpForm>
  </Doc>
);
