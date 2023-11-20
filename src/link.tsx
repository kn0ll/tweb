import type { Schema } from "@effect/schema";
import type { Hash, Location } from "./HTTP";

import * as React from "react";

type HTTPLink<L extends Location> = "GET" extends L["method"]
  ? L & {
      hash: Hash | null;
    }
  : never;

export const link =
  <L extends Location, P extends HTTPLink<L>>(
    _schema: "GET" extends P["method"] ? Schema.Schema<P> : never,
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
      path: P["path"];
      hash: P["hash"];
      search: P["search"];
    }) => (
    <a {...props} href={[path, search, hash].join("")}>
      {children}
    </a>
  );
