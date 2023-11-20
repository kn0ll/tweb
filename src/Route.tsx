import { Schema } from "@effect/schema";
import { Effect } from "effect";
import * as React from "react";

export type HTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type HTTPPath = `/${string}`;

export type HTTPHash = `#${string}`;

export type HTTPSearch = Record<string, string | string[]>;

export type HTTPBody = string;

export type HTTPLocation = {
  method: HTTPMethod;
  path: HTTPPath;
  search: HTTPSearch | null;
};

export type HTTPPage<Method extends HTTPMethod> = "GET" extends Method
  ? HTTPLocation & {
      hash: HTTPHash | null;
    }
  : never;

export type HTTPForm = HTTPLocation & {
  body: HTTPBody | null;
};

export const link =
  <Method extends HTTPMethod, Page extends HTTPPage<Method>>(
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
  <S extends HTTPForm>(_schema: Schema.Schema<S>) =>
  <M extends S["method"]>({
    method,
    children,
  }: {
    method: M;
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
  }) => <form method={method}>{children({} as any)}</form>;
