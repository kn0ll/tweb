import * as DB from "@rpphub/db";
import { Effect, pipe } from "effect";
import { constVoid } from "effect/Function";

import { EmailServiceTag, LoggingEmailService } from "../services/Email.js";

export default (data: { email: string; username: string; password: string }) =>
  pipe(
    DB.resource,
    Effect.flatMap((db) => DB.query(db.user.create)({ data })),
    Effect.flatMap(() => EmailServiceTag),
    Effect.flatMap((email) => email.send(data.email, "Confirm Your Email")),
    Effect.map(constVoid),
    Effect.scoped,
    Effect.orDie,
    Effect.provide(LoggingEmailService),
  );
