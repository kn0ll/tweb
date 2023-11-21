import * as Runtime from "@effect/platform-node/Runtime";
import { pipe } from "effect";
import { Server } from "tweb";

import { homePageRoute } from "../src/HomePage.js";
import { signUpFormRoute } from "../src/SignUpForm.js";
import { signUpPageRoute } from "../src/SignUpPage.js";

pipe(
  Server.make([homePageRoute, signUpFormRoute, signUpPageRoute]),
  Runtime.runMain,
);
