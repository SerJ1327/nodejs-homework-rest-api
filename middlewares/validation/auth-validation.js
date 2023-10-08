import { validateBody } from "../../decorators/index.js";
import {
  userSignupJoiSchema,
  userSigninJoiSchema,
} from "../../models/index.js";

const userSignupJoiValidate = validateBody(userSignupJoiSchema);

const userSigninJoiValidate = validateBody(userSigninJoiSchema);

export { userSignupJoiValidate, userSigninJoiValidate };
