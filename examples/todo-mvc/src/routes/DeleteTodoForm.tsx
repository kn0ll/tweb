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
  body: Schema.struct({ id: Schema.NumberFromString }),
});

export const DeleteTodoForm = Form.make(deleteTodoFormSchema);

export const deleteTodoFormRoute = Route.make(
  deleteTodoFormSchema,
  ({ body: { id } }) =>
    pipe(DB.del(id), Effect.flatMap(constant(todosPageHandler))),
);
