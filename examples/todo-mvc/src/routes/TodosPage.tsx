import { Schema } from "@effect/schema";
import { Effect, flow, pipe } from "effect";
import { constant } from "effect/Function";
import * as React from "react";
import { DOMElement, Link, Route } from "tweb";

import * as DB from "../DB.js";
import Layout from "../Layout.js";
import { CreateTodoForm } from "./CreateTodoForm.js";
import { DeleteTodoForm } from "./DeleteTodoForm.js";

export const TodosPage = ({ todos }: { todos: DB.Todo[] }) => (
  <Layout>
    <h1>Todos</h1>
    <ul>
      {todos.map(({ title }, idx) => (
        <li key={`${idx}-${title}`}>
          {title}
          <DeleteTodoForm
            method="POST"
            pathname="/"
            search={{ action: "delete" }}
          >
            {(Input) => (
              <>
                <Input type="hidden" name="id" value={idx} />
                <input type="submit" value="Delete" />
              </>
            )}
          </DeleteTodoForm>
        </li>
      ))}
    </ul>
    <CreateTodoForm method="POST" pathname="/" search={{ action: "create" }}>
      {(Input) => (
        <>
          <Input type="text" name="title" />
          <input type="submit" value="Create" />
        </>
      )}
    </CreateTodoForm>
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
  Effect.map(TodosPage),
  Effect.map(DOMElement.serverResponse),
);

export const todosPageRoute = Route.make(
  todosPageSchema,
  constant(todosPageHandler),
);
