import { Schema } from "@effect/schema";
import { Effect } from "effect";
import * as React from "react";

export type HTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type HTTPPath = `/${string}`;

export type HTTPHash = `#${string}`;

export type HTTPSearch = Record<string, string | string[]>;

export type HTTPBody = unknown;

export type HTTPLocation = {
  method: HTTPMethod;
  path: HTTPPath;
  search: HTTPSearch | null;
};

export type HTTPPage<Location extends HTTPLocation> =
  "GET" extends Location["method"]
    ? Location & {
        hash: HTTPHash | null;
      }
    : never;

export type HTTPForm<Location extends HTTPLocation> = Location & {
  body: HTTPBody | null;
};

export const link =
  <Location extends HTTPLocation, Page extends HTTPPage<Location>>(
    _schema: "GET" extends Page["method"] ? Schema.Schema<Page> : never,
  ) =>
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
      path: Page["path"];
      hash: Page["hash"];
      search: Page["search"];
    }) => (
    <a {...props} href={[path, search, hash].join("")}>
      {children}
    </a>
  );

// if method is get, accept search config. if method is other, accept body config
export const form =
  <Location extends HTTPLocation, Form extends HTTPForm<Location>>(
    _schema: Schema.Schema<Form>,
  ) =>
  ({
    children,
    ...location
  }: Omit<Form, "body"> & {
    children: (
      Input: ({
        type,
        id,
        name,
      }: {
        type: any;
        id: any;
        name: keyof ("GET" extends M ? S["search"] : S["body"]);
      }) => JSX.Element,
    ) => JSX.Element;
  }) => <form method={location.method}>{children({} as any)}</form>;
