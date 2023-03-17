const { response } = require("express");


const isAdminRoleValidator = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Its necessary to validate the token '
        })
    }
    const { name, role } = req.user
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin`
        })
    }
    next()

}

const hasRoleValidator = (...roles) =>
    (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Its necessary to validate the token '
            })
        }

        const { name, role } = req.user
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `the user ${name} dont have a role valid`
            })
        }

        next()

    }



module.exports = { isAdminRoleValidator, hasRoleValidator }