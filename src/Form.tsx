import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP";

import * as React from "react";

type HTTPForm<L extends Location> = L & {
  body: unknown | null;
};

// if method is get, accept search config. if method is other, accept body config
export const make =
  <L extends Location, Form extends HTTPForm<L>>(
    _schema: Schema.Schema<Form>,
  ) =>
  ({
    children,
    ...location
  }: Omit<Form, "body"> & {
    children: (
      _Input: (
        _props: React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        > & {
          name: keyof ("GET" extends Form["method"]
            ? Form["search"]
            : Form["body"]);
        },
      ) => JSX.Element,
    ) => JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) => <form method={location.method}>{children({} as any)}</form>;

<input />;
