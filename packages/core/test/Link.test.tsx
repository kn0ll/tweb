import { Schema } from "@effect/schema";
import test from "ava";
import { pipe } from "effect";

import * as Link from "../src/Link.js";

const linkSchema = Schema.struct({
	pathname: Schema.literal("/profile"),
	hash: Schema.union(Schema.null, Schema.literal("#description")),
	search: Schema.struct({ username: Schema.string }),
});

test("foo", (t) => {
	t.truthy(
		Link.make(
			pipe(
				linkSchema,
				Schema.extend(Schema.struct({ method: Schema.literal("GET") })),
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
		Link.make(
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
