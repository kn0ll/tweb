import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { App, Server } from "tweb";

import { homePageRoute } from "../src/routes/HomePage.js";
import { signUpFormRoute } from "../src/routes/SignUpForm.js";
import { signUpPageRoute } from "../src/routes/SignUpPage.js";

pipe(
  App.make([homePageRoute, signUpFormRoute, signUpPageRoute]),
  Server.make({ port: 8000 }),
  Runtime.runMain,
);
