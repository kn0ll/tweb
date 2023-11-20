import type { Method } from "@effect/platform/Http/Method";
import type { ReadonlyRecord } from "effect";

export type Pathname = `/${string}`;

export type Hash = `#${string}`;

export type Search = ReadonlyRecord.ReadonlyRecord<string | string[]>;

export type Location = {
  method: Method;
  pathname: Pathname;
  search: Search | null;
};
