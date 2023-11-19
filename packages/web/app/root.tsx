import type { LinksFunction } from "@remix-run/node";

import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Effect, pipe } from "effect";
import { constant, flow } from "effect/Function";
import * as React from "react";

import { client } from "./client.js";
import { root } from "./root.css.js";

export const links: LinksFunction = () =>
  cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [];

export const loader = () =>
  pipe(
    client.currentTime,
    Effect.flatMap(flow(json, constant, Effect.sync)),
    Effect.runPromise,
  );

export default function App() {
  const currentTime = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/log-in">Log In</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div id="sidebar" className={root}>
          <h1>Remix Contacts {currentTime}</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`/contacts/1`}>Your Name</Link>
              </li>
              <li>
                <Link to={`/contacts/2`}>Your Friend</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
