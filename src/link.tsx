import type { Schema } from "@effect/schema";
import type { HTTPHash, HTTPLocation } from "./HTTP";

import * as React from "react";

type HTTPLink<Location extends HTTPLocation> = "GET" extends Location["method"]
  ? Location & {
      hash: HTTPHash | null;
    }
  : never;

export const link =
  <Location extends HTTPLocation, Page extends HTTPLink<Location>>(
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
