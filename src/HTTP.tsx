import { Method } from "@effect/platform/Http/Method";

export type Path = `/${string}`;

export type Hash = `#${string}`;

export type Search = Record<string, string | string[]>;

export type Location = {
  method: Method;
  path: Path;
  search: Search | null;
};
