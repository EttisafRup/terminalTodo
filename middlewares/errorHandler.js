const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(500).send({ err: err });
  }
};

module.exports = errorHandler;
