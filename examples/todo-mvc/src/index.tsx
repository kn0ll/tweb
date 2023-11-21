import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { Server } from "tweb";

import { homePageRoute } from "./routes/HomePage.js";
import { signUpFormRoute } from "./routes/SignUpForm.js";
import { signUpPageRoute } from "./routes/SignUpPage.js";

pipe(
  Server.make([homePageRoute, signUpFormRoute, signUpPageRoute]),
  Runtime.runMain,
);
