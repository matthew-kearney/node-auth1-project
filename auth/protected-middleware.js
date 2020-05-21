module.exports = {
    isValid, restricted
  };

  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }

  function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
      next();
    } else {
      res.status(401).json({ you: "cannot pass!" });
    }
  } 