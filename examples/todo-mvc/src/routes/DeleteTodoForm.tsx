import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { Form, Route } from "tweb";

export const deleteTodoFormSchema = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/sign-up"),
  search: Schema.null,
  body: Schema.struct({
    id: pipe(Schema.string, Schema.numberFromString),
  }),
});

export const DeleteTodoForm = Form.make(deleteTodoFormSchema);

// TODO: need to parse body (annotate body schema?)...
export const deleteTodoFormRoute = Route.make(deleteTodoFormSchema, () =>
  pipe("Sign Up Form", ServerResponse.text, Effect.succeed),
);
