import type { Method } from "@effect/platform/Http/Method";
import type { ReadonlyRecord } from "effect";

export type Path = `/${string}`;

export type Hash = `#${string}`;

export type Search = ReadonlyRecord.ReadonlyRecord<string | string[]>;

export type Location = {
  method: Method;
  path: Path;
  search: Search | null;
};
