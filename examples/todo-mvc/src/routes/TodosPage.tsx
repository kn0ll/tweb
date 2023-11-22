import { Schema } from "@effect/schema";
import { Effect, flow, pipe } from "effect";
import { constant } from "effect/Function";
import * as React from "react";
import { DOMElement, Link, Route } from "tweb";

import * as DB from "../DB.js";
import Layout from "../Layout.js";
import { DeleteTodoForm } from "./DeleteTodoForm.js";

export const TodosPage = ({ todos }: { todos: DB.Todo[] }) => (
  <Layout>
    <h1>Todos</h1>
    <ul>
      {todos.map(({ title }, idx) => (
        <li key={`${idx}-${title}`}>
          {title}
          <DeleteTodoForm method="POST" pathname="/" search={null}>
            {(Input) => (
              <>
                <Input type="hidden" name="id" />
                <input type="submit" value="Delete" />
              </>
            )}
          </DeleteTodoForm>
        </li>
      ))}
    </ul>
  </Layout>
);

export const todosPageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  hash: Schema.null,
});

export const TodosPageLink = Link.make(todosPageSchema);

export const todosPageHandler = pipe(
  DB.all,
  Effect.map((todos) => ({ todos })),
  Effect.flatMap(flow(TodosPage, Effect.succeed)),
  Effect.map(DOMElement.serverResponse),
);

export const todosPageRoute = Route.make(todosPageSchema, () => {
  console.log("aaaaaaaaaaa");
  return todosPageHandler;
});
