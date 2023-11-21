import { Effect } from "effect";

type Todo = {
  title: string;
  updatedAt: Date;
};

const todos: Todo[] = [{ title: "Get Operated On", updatedAt: new Date() }];

export const create = (todo: Todo) => Effect.sync(() => todos.push(todo));

export const read = (idx: number) => Effect.sync(() => todos[idx]);

export const all = Effect.sync(() => todos);

export const update = (idx: number) => (todo: Todo) =>
  Effect.sync(() => (todos[idx] = todo));

export const del = (idx: number) => Effect.sync(() => todos.splice(idx, 1));