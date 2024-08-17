import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { constant } from "effect/Function";
import { Form, Route } from "tweb";
import * as DB from "../DB.js";
import { todosPageHandler } from "./TodosPage.js";

export const CreateTodoFormSchema = Schema.Struct({
	method: Schema.Literal("POST"),
	pathname: Schema.Literal("/"),
	search: Schema.Struct({ action: Schema.Literal("create") }),
	body: Schema.Struct({ title: Schema.String }),
});

export const CreateTodoForm = Form.make(CreateTodoFormSchema);

export const createTodoFormRoute = Route.make(
	CreateTodoFormSchema,
	({ body: { title } }) =>
		pipe(DB.create(title), Effect.flatMap(constant(todosPageHandler))),
);
