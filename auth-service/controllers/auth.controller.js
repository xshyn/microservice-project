const { registerService, loginService } = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    await registerService(email, password);
    return res.json("created");
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    return res.json(token);
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login };
