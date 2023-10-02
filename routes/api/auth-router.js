import express from "express";
import { authController } from "../../controllers/index.js";
import {
  userSignupJoiValidate,
  userSigninJoiValidate,
  authenticate,
} from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", userSignupJoiValidate, authController.signup);
authRouter.post("/login", userSigninJoiValidate, authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;
