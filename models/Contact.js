import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./index.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String, match: emailRegexp },
    phone: {
      type: String,
    },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);
export default Contact;

export const contactAddJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
