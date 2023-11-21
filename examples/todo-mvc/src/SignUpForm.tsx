import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { Form, Route } from "tweb";

export const signUpFormSchema = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/sign-up"),
  search: Schema.null,
  body: Schema.struct({
    username: Schema.string,
    password: Schema.string,
    email: Schema.string,
  }),
});

export const SignUpForm = Form.make(signUpFormSchema);

// TODO: need to parse body...
export default Route.make(signUpFormSchema, () =>
  pipe("Sign Up Form", ServerResponse.text, Effect.succeed),
);
