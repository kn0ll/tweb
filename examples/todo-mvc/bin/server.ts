import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { App, Server } from "tweb";

import { createTodoFormRoute } from "../src/routes/CreateTodoForm.js";
import { deleteTodoFormRoute } from "../src/routes/DeleteTodoForm.js";
import { todosPageRoute } from "../src/routes/TodosPage.js";

pipe(
  App.make([createTodoFormRoute, deleteTodoFormRoute, todosPageRoute]),
  Server.make({ port: 8000 }),
  Runtime.runMain,
);
