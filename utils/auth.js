// fxn acts as a normal request CB fxn, checks for existence of session property & then populates it w/ the fxn
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
