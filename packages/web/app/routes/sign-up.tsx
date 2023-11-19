import { Form, Link } from "@remix-run/react";
import * as React from "react";

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
