import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { constant } from "effect/Function";
import { Form, Route } from "tweb";

import * as DB from "../DB.js";
import { todosPageHandler } from "./TodosPage.js";

export const createTodoFormSchema = Schema.struct({
  method: Schema.literal("POST"),
  pathname: Schema.literal("/"),
  search: Schema.struct({ action: Schema.literal("create") }),
  body: Schema.struct({ title: Schema.string }),
});

export const CreateTodoForm = Form.make(createTodoFormSchema);

export const createTodoFormRoute = Route.make(
  createTodoFormSchema,
  ({ body: { title } }) =>
    pipe(DB.create(title), Effect.flatMap(constant(todosPageHandler))),
);
