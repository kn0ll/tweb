import { PrismaClient } from "@rpphub/db";
import { Effect, pipe } from "effect";

import * as Runtime from "./Runtime";

const prisma = new PrismaClient();

// console.log("foo is", prisma);

// const foo = async () => {
//   const newUser = await prisma.user.create({
//     data: {
//       username: "xxx",
//       password: "word",
//       email: "alice@prisma.io",
//     },
//   });

//   console.log("newUser is ", newUser);
// };

// foo();

const main = pipe(
  Effect.log("Hello"),
  Effect.withSpan("d"),
  Effect.withSpan("b"),
  Effect.withSpan("rrrrrr"),
  Effect.repeatN(5),
  Effect.annotateSpans("working", true),
);

Runtime.run(main);
