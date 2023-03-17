const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");


const { isRoleValid, emailExist, userExistbyId, isRoleValidOptional } = require("../helpers/db-validators");
/* const { fieldsValidator } = require("../middleware/fields-validator");
const { isAdminRoleValidator, hasRoleValidator } = require("../middleware/role-validator");
const { validateJWT } = require("../middleware/validate-jwt"); */

const {
  fieldsValidator,
  isAdminRoleValidator, hasRoleValidator,
  validateJWT

} = require("../middleware")
console.log(fieldsValidator);
const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "The name is required").notEmpty(),
    check(
      "password",
      "The password is required and more than three letters"
    ).isLength({ min: 6 }),
    check("email", "Email invalid").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(isRoleValid),

    fieldsValidator,
  ],
  usersPost
);

//check lo usamos para validaciones de campos, middleware personalizados tienen los req y res

router.put("/:id", [
  check('id', 'Is not a valid id').isMongoId(),
  check("id").custom(userExistbyId),
  check("role").custom(isRoleValidOptional),
  fieldsValidator
], usersPut);


router.delete("/:id", [
  validateJWT,
  isAdminRoleValidator,
  hasRoleValidator('ADMIN_ROLE', 'USER_ROLE'),
  check('id', 'Is not a valid id').isMongoId(),
  check("id").custom(userExistbyId),
  fieldsValidator

], usersDelete);

module.exports = router;
