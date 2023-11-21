import { Schema } from "@effect/schema";
import { Effect, flow, pipe } from "effect";
import * as React from "react";
import { DOMElement, Link, Route } from "tweb";

import * as DB from "../DB.js";
import Layout from "../Layout.js";

export const homePageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  hash: Schema.null,
});

export const HomePageLink = Link.make(homePageSchema);

export const homePageRoute = Route.make(
  homePageSchema,
  flow(
    () =>
      pipe(
        DB.all,
        Effect.flatMap((todos) =>
          Effect.succeed(
            <Layout>
              <h1>Todos</h1>
              <ul>
                {todos.map(({ title }, idx) => (
                  <li key={`${idx}-${title}`}>{title}</li>
                ))}
              </ul>
            </Layout>,
          ),
        ),
      ),
    Effect.map(DOMElement.serverResponse),
  ),
);
