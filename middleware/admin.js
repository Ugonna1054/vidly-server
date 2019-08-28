

module.exports = function (req, res, next) {
    
    if (!req.user.isAdmin) return res.status(403).send('Acces Denied..only Admins')
    next()
}









// 401 Unauthorized
//403 Forbidden
//internal server error