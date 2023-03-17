const { response } = require("express");
const bycryjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");



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


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body

    try {
        const { email, img, name } = await googleVerify(id_token)

        let user = await User.findOne({ email })

        if (!user) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
            }

            user = new User(data)
            await user.save()
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'User blocked'
            })
        }

        const token = await generateJWT(user.id)

        return res.json({
            token,
            user
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Token not verified",
        })
    }
}

module.exports = { login, googleSignIn }