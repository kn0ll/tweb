import { Schema } from "@effect/schema";
import * as React from "react";
import { Link, Route } from "tweb";

import { Layout } from "./Layout.js";

export const homePageSchema = Schema.struct({
  method: Schema.literal("GET"),
  pathname: Schema.literal("/"),
  search: Schema.null,
  hash: Schema.null,
});

export const HomePageLink = Link.make(homePageSchema);

export default Route.page(homePageSchema, ({ method, pathname }) => (
  <Layout>
    <h1>
      Home ({method} {pathname})
    </h1>
  </Layout>
));
