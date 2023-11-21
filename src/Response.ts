import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { flow } from "effect";
import { renderToString } from "react-dom/server";

export const react = flow(
  renderToString,
  ServerResponse.raw,
  ServerResponse.setHeader("Content-Type", "text/html"),
);
