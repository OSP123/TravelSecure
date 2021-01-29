// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  req.flash('unAuthenticated', 'Sorry, you must be logged in to see that');
  // If the user isnt' logged in, redirect them to the login page
  return res.redirect("/");
};
