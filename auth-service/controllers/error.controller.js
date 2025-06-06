function errorController(err, req, res, next) {
  return res.status(err.status || 500).json({ error: err.message });
}

function notFoundController(req, res, next) {
  return res.status(404).json({ error: "Not Found" });
}

module.exports = { errorController, notFoundController };
