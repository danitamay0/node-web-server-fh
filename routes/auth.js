const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { fieldsValidator } = require("../middleware")


const router = Router();

router.post("/login", [
    check('email', "The email is required").isEmail(),
    check('password', "The password is required").notEmpty(),
    fieldsValidator
], login);

module.exports = router