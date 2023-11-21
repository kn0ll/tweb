import * as React from "react";

import { HomePageLink } from "./routes/HomePage.js";

export default ({ children }: React.PropsWithChildren) => (
  <html>
    <body>
      <header>
        <h1>
          <HomePageLink pathname="/" hash={null} search={null}>
            Logo
          </HomePageLink>
        </h1>
      </header>
      {children}
    </body>
  </html>
);
