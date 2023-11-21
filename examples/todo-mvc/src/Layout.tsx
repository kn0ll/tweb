import * as React from "react";

import { HomePageLink } from "./HomePage.js";
import { SignUpPageLink } from "./SignUpPage.js";

export const Layout = ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <h1>
          <HomePageLink pathname="/" hash={null} search={null}>
            Logo
          </HomePageLink>
        </h1>
        <nav>
          <ul>
            <li>
              <SignUpPageLink pathname="/sign-up" hash={null} search={null}>
                Sign Up
              </SignUpPageLink>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </body>
  </html>
);
