// The requiresSecure function depends on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
  };
} else {
  module.exports.requiresSecure = (req, res, next) => {
    next();
  };
}
