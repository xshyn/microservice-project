const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const UserModel = require("../models/user.model");

async function registerService(email, password) {
  const userExist = await UserModel.exists({ email });
  if (userExist) throw new createHttpError(409, "user already exist");
  const user = new UserModel({ email, password });
  await user.save();
  return user;
}
async function loginService(email, password) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new createHttpError(404, "user not found");
  if (user?.password !== password)
    throw new createHttpError(400, "invalid password");
  const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });
  return token;
}

module.exports = { registerService, loginService };
