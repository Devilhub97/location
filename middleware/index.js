function Auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send({ message: "Please login" })
    }
}
module.exports = Auth