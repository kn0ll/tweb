import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Effect, pipe } from "effect";
import { constant } from "effect/Function";
import * as React from "react";

import { client } from "../client.js";

export const action = () =>
  pipe(
    client.signUp({ email: "", username: "", password: "" }),
    Effect.map(pipe(redirect("/sign-up/authorize"), constant)),
    Effect.runPromise,
  );

export default () => {
  const emailId = React.useId();
  const passwordId = React.useId();

  return (
    <div>
      <h2>Sign Up</h2>
      <Form method="post">
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="text" placeholder="Email" />
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </Form>
      <p>
        Already have an account? <Link to="/log-in">Log In</Link>!
      </p>
    </div>
  );
};
