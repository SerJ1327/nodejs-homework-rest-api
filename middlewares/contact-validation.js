import { validateBody } from "../decorators/index.js";
import {
  contactAddJoiSchema,
  contactUpdateFavoriteJoiSchema,
} from "../models/index.js";

const addContactJoiValidate = validateBody(contactAddJoiSchema);

const updateFavoriteContactJoiValidate = validateBody(
  contactUpdateFavoriteJoiSchema
);

export { addContactJoiValidate, updateFavoriteContactJoiValidate };
