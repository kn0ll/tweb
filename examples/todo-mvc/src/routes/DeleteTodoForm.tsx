import { Schema } from "@effect/schema";
import { Effect, flow, pipe } from "effect";
import { constant } from "effect/Function";
import { Form, Route } from "tweb";

import * as DB from "../DB.js";
import { todosPageHandler } from "./TodosPage.js";

export const deleteTodoFormSchema = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  body: Schema.struct({ id: Schema.string }),
});

export const DeleteTodoForm = Form.make(deleteTodoFormSchema);

// TODO: need to parse body (annotate body schema?)...
export const deleteTodoFormRoute = Route.make(
  deleteTodoFormSchema,
  ({ body: { id } }) =>
    pipe(DB.del(parseInt(id)), Effect.flatMap(constant(todosPageHandler))),
);
