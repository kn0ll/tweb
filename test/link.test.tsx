import { Schema } from "@effect/schema";
import test from "ava";
import { pipe } from "effect";

import { link } from "../src/link";

const linkSchema = Schema.struct({
  path: Schema.literal("/profile"),
  hash: Schema.union(Schema.null, Schema.literal("#description")),
  search: Schema.struct({ username: Schema.string }),
});

test("foo", (t) => {
  t.truthy(
    link(
      pipe(
        linkSchema,
        Schema.extend(Schema.struct({ method: Schema.literal("GET") })),
      ),
    ),
  );
});

test("foo2", (t) => {
  t.truthy(
    link(
      pipe(
        linkSchema,
        Schema.extend(
          Schema.struct({
            method: Schema.union(Schema.literal("GET"), Schema.literal("POST")),
          }),
        ),
      ),
    ),
  );
});

test("foo3", (t) => {
  t.truthy(
    link(
      // @ts-expect-error: should fail because it's not GET
      pipe(
        linkSchema,
        Schema.extend(
          Schema.struct({
            method: Schema.literal("POST"),
          }),
        ),
      ),
    ),
  );
});
