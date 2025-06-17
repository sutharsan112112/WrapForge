export const verifyAdminOrPartner = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'partner')) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Only Admin or Partner allowed.' });
  }
};