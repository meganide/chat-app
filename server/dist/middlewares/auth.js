function requireAuth(req, res, next) {
    console.log('Current user is: ', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (isLoggedIn) {
        return next();
    }
    // return res.redirect('/login');
    return res.send({
        error: 'You must log in!',
    });
}
export { requireAuth };
