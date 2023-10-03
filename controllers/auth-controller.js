import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, subscription } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const subscriptions = await subscription.findOne({ value: "starter" });
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    subscriptions: [subscriptions.value],
  });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;
  const payload = { id };

  const token = jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: "12h" },
    { subscription: id.subscriptions }
  );

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: { email: user.email, subscriptions: user.subscriptions },
  });
};

const getCurrent = (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Signout success" });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
