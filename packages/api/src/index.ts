import { Effect, pipe } from "effect";

import * as DB from "./DB";
import * as Runtime from "./Runtime";

// const prisma: PrismaClient = new PrismaClient();

// console.log(prisma);

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
  DB.resource,
  Effect.flatMap((db) =>
    pipe(
      DB.query(db.user.findMany)(),
      Effect.flatMap((users) =>
        pipe(
          Effect.log("Hello"),
          Effect.withSpan("d"),
          Effect.withSpan("b"),
          Effect.withSpan("rrrrrr"),
          Effect.repeatN(5),
          Effect.annotateSpans("working", true),
        ),
      ),
    ),
  ),
  Effect.scoped,
);

/*
TODO:
make a resource, for a service, for the db.
*/

Runtime.run(main);
