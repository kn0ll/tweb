import * as Http from "@effect/platform/HttpClient";
import * as Client from "@effect/rpc-http/Client";
import * as Schema from "@rpphub/api-schema";

export const client = Client.make(
  Schema.make,
  Http.client
    .fetch()
    .pipe(
      Http.client.mapRequest(
        Http.request.prependUrl("http://localhost:3000/rpc"),
      ),
    ),
);
