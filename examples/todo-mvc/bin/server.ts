import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { App, Server } from "tweb";

import { deleteTodoFormRoute } from "../src/routes/DeleteTodoForm.js";
import { todosPageRoute } from "../src/routes/TodosPage.js";

pipe(
  App.make([todosPageRoute, deleteTodoFormRoute]),
  Server.make({ port: 8000 }),
  Runtime.runMain,
);
