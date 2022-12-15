function requireAuth(req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (isLoggedIn) {
        return next();
    }
    return res.redirect('/login');
}
export { requireAuth };
