// middlewares/auth.js
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        // Si hay usuario en sesión, continua
        return next();
    } else {
        // Si no hay usuario, redirige al home (o donde quieras)
        return res.redirect('/api/v1/home');
    }
}

module.exports = isAuthenticated;
