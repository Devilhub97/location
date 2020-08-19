function Auth(req, res, next) {
    console.log("1", req.session)
    console.log("2", req.session.user)
    if (req.session.user) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.status(401).send({ message: "Please login" })
    }
}
module.exports = Auth