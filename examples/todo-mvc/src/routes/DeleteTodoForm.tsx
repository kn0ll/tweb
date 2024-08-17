import { Schema } from "@effect/schema";
import { Form, Route } from "a-web";
import { Effect, pipe } from "effect";
import { constant } from "effect/Function";
import * as DB from "../DB.js";
import { todosPageHandler } from "./TodosPage.js";

export const deleteTodoFormSchema = Schema.Struct({
	method: Schema.Literal("POST"),
	pathname: Schema.Literal("/"),
	search: Schema.Struct({ action: Schema.Literal("delete") }),
	body: Schema.Struct({ id: Schema.NumberFromString }),
});

export const DeleteTodoForm = Form.make(deleteTodoFormSchema);

export const deleteTodoFormRoute = Route.make(
	deleteTodoFormSchema,
	({ body: { id } }) =>
		pipe(DB.del(id), Effect.flatMap(constant(todosPageHandler))),
);
