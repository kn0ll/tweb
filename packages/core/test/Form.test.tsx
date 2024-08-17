import { Schema } from "@effect/schema";
import test from "ava";
import * as React from "react";

import * as Form from "../src/Form.js";

const updateProfileSchema = Schema.struct({
	method: Schema.literal("PUT"),
	pathname: Schema.literal("/profile"),
	search: Schema.struct({ id: Schema.string }),
	body: Schema.struct({
		username: Schema.string,
		description: Schema.string,
	}),
});

const UpdateProfileForm = Form.make(updateProfileSchema);

test("foo", (t) => {
	t.truthy(
		<UpdateProfileForm method="PUT" pathname="/profile" search={{ id: "foo" }}>
			{() => <p>hello world</p>}
		</UpdateProfileForm>,
	);
});

test("bar", async (t) => {
	t.truthy(
		// @ts-expect-error: should fail because it's not POST page
		<UpdateProfileForm method="POST" pathname="/profile" search={{ id: "foo" }}>
			{() => <p>hello world</p>}
		</UpdateProfileForm>,
	);
});

test("bin", async (t) => {
	t.truthy(
		<UpdateProfileForm method="PUT" pathname="/profile" search={{ id: "foo" }}>
			{(Input) => (
				<>
					{/* @ts-expect-error: should fail because it's not a valid body parameter */}
					<Input name="invalid" />
				</>
			)}
		</UpdateProfileForm>,
	);
});

test("baz", async (t) => {
	t.truthy(
		<UpdateProfileForm method="PUT" pathname="/profile" search={{ id: "foo" }}>
			{(Input) => (
				<>
					<Input name="username" />
				</>
			)}
		</UpdateProfileForm>,
	);
});
