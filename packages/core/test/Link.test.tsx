import { Schema } from "@effect/schema";
import test from "ava";
import { pipe } from "effect";

import * as Link from "../src/Link.js";

const linkSchema = Schema.Struct({
	pathname: Schema.Literal("/profile"),
	hash: Schema.NullOr(Schema.Literal("#description")),
	search: Schema.Struct({ username: Schema.String }),
});

test("foo", (t) => {
	t.truthy(
		Link.make(
			pipe(
				linkSchema,
				Schema.extend(Schema.Struct({ method: Schema.Literal("GET") })),
			),
		),
	);
});

test("foo2", (t) => {
	t.truthy(
		Link.make(
			pipe(
				linkSchema,
				Schema.extend(
					Schema.Struct({
						method: Schema.Union(Schema.Literal("GET"), Schema.Literal("POST")),
					}),
				),
			),
		),
	);
});

test("foo3", (t) => {
	t.truthy(
		Link.make(
			// @ts-expect-error: should fail because it's not GET
			pipe(
				linkSchema,
				Schema.extend(
					Schema.Struct({
						method: Schema.Literal("POST"),
					}),
				),
			),
		),
	);
});
