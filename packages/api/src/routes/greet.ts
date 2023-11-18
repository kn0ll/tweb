import { Effect } from "effect";

export default (name: string) => Effect.succeed(`Hello ${name}!`);
