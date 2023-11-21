import { Schema } from "@effect/schema";
import { Effect, flow } from "effect";
import * as React from "react";
import { DOMElement, Link, Route } from "tweb";

import { Layout } from "../Layout.js";

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
    ({ method, pathname }) => (
      <Layout>
        <h1>
          Home ({method} {pathname})
        </h1>
      </Layout>
    ),
    DOMElement.serverResponse,
    Effect.succeed,
  ),
);
