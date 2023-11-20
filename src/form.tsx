import type { HTTPBody, HTTPLocation } from "./HTTP";

import { Schema } from "@effect/schema";
import * as React from "react";

type HTTPForm<Location extends HTTPLocation> = Location & {
  body: HTTPBody | null;
};

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
      _Input: ({
        type,
        id,
        name,
      }: {
        type: any;
        id: any;
        name: keyof ("GET" extends Form["method"]
          ? Form["search"]
          : Form["body"]);
      }) => JSX.Element,
    ) => JSX.Element;
  }) => <form method={location.method}>{children({} as any)}</form>;
