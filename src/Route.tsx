import { Schema } from "@effect/schema";
import { Effect } from "effect";
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
export const link =
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

export const handler =
  <S extends HttpLinkSchema>(schema: Schema.Schema<S>) =>
  <A extends unknown>(fn: (_s: S) => Effect.Effect<never, never, A>) =>
    [schema, fn] as const;

// if method is get, accept search config. if method is other, accept body config
export const form =
  <S extends HttpRequestSchema>(_schema: Schema.Schema<S>) =>
  <M extends S["method"]>(
    method: M,
    _config: "GET" extends M ? S["search"] : S["body"],
  ) =>
  ({ children }: { children: (_s: { Input: any }) => JSX.Element }) => (
    <form method={method}>{children({} as any)}</form>
  );
