const { Router } = require("express");
const UserModel = require("../model/uesr.model");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserModel.exists({ email });
    if (userExist) throw new createHttpError(409, "user already exist");
    const user = new UserModel({ email, password });
    await user.save();
    return res.json("created");
  } catch (error) {
    return next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new createHttpError(404, "user not found");
    if (user?.password !== password)
      throw new createHttpError(400, "invalid password");
    const token = jwt.sign(
      { email },
      "secretKey",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw new createHttpError(500, "something went wrong");
        return res.json(token);
      }
    );
  } catch (error) {
    return next(error);
  }
});

module.exports = {
  authRouter: router,
};
