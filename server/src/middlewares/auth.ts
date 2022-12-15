function requireAuth(req: any, res: any, next: any) {
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (isLoggedIn) {
    return next();
  }

  return res.redirect('/login');
}

export { requireAuth };
