import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactValidation from "../../middleware/validation/contact-validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  contactValidation.addContactValidate,
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  contactValidation.addContactValidate,
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
