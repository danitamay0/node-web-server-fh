const { response, request } = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Token is required'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY_T)

        req.uid = uid
        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'User invalid'
            })
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'User deleted'
            })
        }

        req.user = user

        next()

    } catch (erro) {
        return res.status(401).json({
            msg: 'Token invalid'
        })
    }
}


module.exports = {
    validateJWT
}