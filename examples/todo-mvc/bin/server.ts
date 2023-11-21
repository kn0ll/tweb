import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { Server } from "tweb";

import { homePageRoute } from "../src/routes/HomePage.js";
import { signUpFormRoute } from "../src/routes/SignUpForm.js";
import { signUpPageRoute } from "../src/routes/SignUpPage.js";

pipe(
  Server.make([homePageRoute, signUpFormRoute, signUpPageRoute]),
  Runtime.runMain,
);
