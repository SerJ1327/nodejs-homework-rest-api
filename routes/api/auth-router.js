import { Router } from "express";
import {
  userSignupJoiValidate,
  userSigninJoiValidate,
  authenticate,
  upload,
} from "../../middlewares/index.js";
import { authController } from "../../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", userSignupJoiValidate, authController.signup);
authRouter.post("/login", userSigninJoiValidate, authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
