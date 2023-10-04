import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    value: { type: String, default: "starter" },
  },
  { versionKey: false, timestamps: true }
);

const subscription = model("subscription", subscriptionSchema);
export default subscription;
