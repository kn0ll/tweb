import { NodeRuntime } from "@effect/platform-node";
import { App, Server } from "a-web";
import { pipe } from "effect";
import { createTodoFormRoute } from "../src/routes/CreateTodoForm.js";
import { deleteTodoFormRoute } from "../src/routes/DeleteTodoForm.js";
import { todosPageRoute } from "../src/routes/TodosPage.js";

pipe(
	App.make([todosPageRoute, deleteTodoFormRoute, createTodoFormRoute]),
	Server.make({ port: 8000 }),
	NodeRuntime.runMain,
);
