const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

async function isAuthenticated(req, res, next) {
  try {
    const [_, token] = req.headers?.["authorization"].split(" ");
    jwt.verify(token, "secretKey", (err, payload) => {
      if (err) throw new createHttpError(401, "Unauthorized");
      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isAuthenticated,
};
