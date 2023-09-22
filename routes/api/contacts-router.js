import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {
  addContactValidate,
  updateFavoriteContactValidate,
  isValidId,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post("/", addContactValidate, contactsController.add);

contactsRouter.put(
  "/:contactId",
  isValidId,
  addContactValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  updateFavoriteContactValidate,
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
