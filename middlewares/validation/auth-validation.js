import { validateBody } from "../../decorators/index.js";
import {
  userSignupJoiSchema,
  userSigninJoiSchema,
  userEmailJoiSchema,
} from "../../models/index.js";

const userSignupJoiValidate = validateBody(userSignupJoiSchema);
const userSigninJoiValidate = validateBody(userSigninJoiSchema);
const userEmailJoiValidate = validateBody(userEmailJoiSchema);

export { userSignupJoiValidate, userSigninJoiValidate, userEmailJoiValidate };
