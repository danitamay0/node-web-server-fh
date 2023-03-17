const { response } = require("express");
const bycryjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");



const login = async (req, res = response) => {
    const { email, password } = req.body


    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "Email / Password not valid - email"
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: "Email / Password not valid - state"
            })
        }

        if (!bycryjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: "Email / Password not valid - password"
            })
        }

        const token = await generateJWT(user.id)
        res.send({
            msg: "login",
            token,
            user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in server",
        })
    }

}


module.exports = { login }