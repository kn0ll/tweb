import { Schema } from "@effect/schema";
import * as React from "react";
import { Link, Route } from "tweb";

import { Layout } from "./Layout.js";
import { SignUpForm } from "./SignUpForm.js";

export const signUpPageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/sign-up"),
  search: Schema.null,
  hash: Schema.null,
});

export const SignUpLink = Link.make(signUpPageSchema);

export default Route.page(signUpPageSchema, () => (
  <Layout>
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
  </Layout>
));
