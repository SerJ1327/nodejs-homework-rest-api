import fs from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";

import { User, subscription } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const subscriptions = await subscription.findOne({ value: "starter" });

  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    subscriptions: [subscriptions.value],
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
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
    user: {
      email: user.email,
      subscriptions: user.subscriptions,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = (req, res) => {
  const { email } = req.user;
  res.json(email);
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Signout success" });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  Jimp.read(oldPath)
    .then((img) => {
      img.resize(Jimp.AUTO, 250).write(oldPath);
      return fs.rename(oldPath, newPath);
    })
    .catch((err) => {
      console.error(err);
    });

  const avatarURL = path.join("avatars", filename);
  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );
  res.json({ avatarURL: result.avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
