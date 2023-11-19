import { Form, Link } from "@remix-run/react";
import * as React from "react";

export default () => {
  const emailId = React.useId();
  const passwordId = React.useId();

  return (
    <div>
      <h2>Log In</h2>
      <Form method="post">
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="text" placeholder="Email" />
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </Form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>!
      </p>
    </div>
  );
};
