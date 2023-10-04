import express from "express";
import { contactsController } from "../../controllers/index.js";
import {
  addContactJoiValidate,
  updateFavoriteContactJoiValidate,
  authenticate,
  subscriptionsMiddleware,
  isValidId,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  "/",
  subscriptionsMiddleware(["starter", "pro", "business"]),
  contactsController.getAll
);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post("/", addContactJoiValidate, contactsController.add);

contactsRouter.put(
  "/:contactId",
  isValidId,
  addContactJoiValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  updateFavoriteContactJoiValidate,
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
