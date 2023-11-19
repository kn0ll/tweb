import { Context, Effect, Layer } from "effect";

export type EmailService = {
  readonly send: (
    to: string,
    message: string,
  ) => Effect.Effect<never, Error, void>;
};

export const EmailServiceTag = Context.Tag<EmailService>();

export const LoggingEmailService = Layer.succeed(
  EmailServiceTag,
  EmailServiceTag.of({
    send: (to, message) => Effect.log(`Send email ${to}: ${message}`),
  }),
);
