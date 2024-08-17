import { Schema } from "@effect/schema";
import test from "ava";
import * as React from "react";

import * as Form from "../src/Form.js";

const UpdateProfileSchema = Schema.Struct({
	method: Schema.Literal("PUT"),
	pathname: Schema.Literal("/profile"),
	search: Schema.Struct({ id: Schema.String }),
	body: Schema.Struct({
		username: Schema.String,
		description: Schema.String,
	}),
});

const UpdateProfileForm = Form.make(UpdateProfileSchema);

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
