import jwt from 'jsonwebtoken';
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;  //bắt từ err .
    const message = err.message || "something went wrong !";
    return res.status(status).json({ message: message })
}

const authMiddleware = (req, res, next) => {
    let token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: "UnAuthorize" })
    }
    try {
        const secret = "secret";
        let userVerify = jwt.verify(token, secret);
        req.user = userVerify
        next()
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports = {
    errorMiddleware,
    authMiddleware
}