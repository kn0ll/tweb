import { Schema } from "@effect/schema";
import { Effect, flow, pipe } from "effect";
import { constant } from "effect/Function";
import * as React from "react";
import { DOMElement, Link, Route } from "tweb";

import * as DB from "../DB.js";
import Layout from "../Layout.js";

export const HomePage = ({ todos }: { todos: DB.Todo[] }) => (
  <Layout>
    <h1>Todos</h1>
    <ul>
      {todos.map(({ title }, idx) => (
        <li key={`${idx}-${title}`}>{title}</li>
      ))}
    </ul>
  </Layout>
);

export const homePageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  hash: Schema.null,
});

export const HomePageLink = Link.make(homePageSchema);

export const homePageRoute = Route.make(
  homePageSchema,
  pipe(
    DB.all,
    Effect.map((todos) => ({ todos })),
    Effect.flatMap(flow(HomePage, Effect.succeed)),
    Effect.map(DOMElement.serverResponse),
    constant,
  ),
);
