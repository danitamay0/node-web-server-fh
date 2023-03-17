const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { fieldsValidator } = require("../middleware")


const router = Router();

router.post("/login", [
    check('email', "The email is required").isEmail(),
    check('password', "The password is required").notEmpty(),
    fieldsValidator
], login);


router.post('/google', [
    check('id_token', 'Id token is required').notEmpty(),
    fieldsValidator
], googleSignIn)

module.exports = router