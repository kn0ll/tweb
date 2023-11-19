import { Schema } from "@effect/schema";
import * as React from "react";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type Path = `/${string}`;

type Hash = `#${string}`;

type HttpSchema = {
  method: Method;
  path: Path;
  hash: Hash | null;
  search: unknown | null;
};

type HttpRequestSchema = HttpSchema & {
  body: unknown | null;
};

type HttpLinkSchema = HttpSchema & {
  body: null;
};

// TODO: ensure `METHOD` contains `GET`
const link =
  <S extends HttpLinkSchema>(_schema: Schema.Schema<S>) =>
  ({
    path,
    hash,
    search,
    children,
    ...props
  }: React.PropsWithChildren &
    Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      "href"
    > & {
      path: S["path"];
      hash: S["hash"];
      search: S["search"];
    }) => (
    <a {...props} href={[path, search, hash].join("")}>
      {children}
    </a>
  );

const indexRouteSchema = Schema.struct({
  method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
  path: Schema.literal("/"),
  hash: Schema.null,
  search: Schema.null,
  body: Schema.null,
});

const IndexLink = link(indexRouteSchema);

export const Link = IndexLink({
  path: "/",
  hash: null,
  search: null,
  children: "Text For Link",
});

const crazyRouteSchema = Schema.struct({
  method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
  path: Schema.literal("/foo/bar"),
  hash: Schema.literal("#foo"),
  search: Schema.struct({ username: Schema.string }),
  body: Schema.null,
});

const CrazyLink = link(crazyRouteSchema);

export const Link2 = CrazyLink({
  path: "/foo/bar",
  hash: "#foo",
  search: { username: "foo" },
  children: "Text For Link",
});
