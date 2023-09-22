// import contactSchemas from "../../cont/contact-schemas.js";

import { validateBody } from "../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../models/Contact.js";

const addContactValidate = validateBody(contactAddSchema);

const updateFavoriteContactValidate = validateBody(contactUpdateFavoriteSchema);

export default (addContactValidate, updateFavoriteContactValidate);
