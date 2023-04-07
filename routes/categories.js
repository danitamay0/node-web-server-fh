const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator, validateJWT, isAdminRoleValidator } = require("../middleware");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categories");
const { categoryExistbyName, categoryNotExistbyId } = require("../helpers/db-validators");


const router = Router();

//Get categories - public
router.get('/', getCategories)

//Get category by id - public
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(categoryNotExistbyId),

    fieldsValidator
], getCategory)


//Create category - private - all
router.post('/', [validateJWT,
    check('name', 'the name is required').notEmpty(),
    check('name').custom(categoryExistbyName),
    fieldsValidator,
], createCategory)

//update category - private - all
router.put('/:id',
    [validateJWT,
        check('id', 'Is not a valid id').isMongoId(),
        check('id').custom(categoryNotExistbyId),
        check('name', 'the name is required').notEmpty(),
        check('name').custom(categoryExistbyName),
        fieldsValidator
    ],
    updateCategory)

//delete category - private - admin

router.delete('/:id', [
    validateJWT,
    isAdminRoleValidator,

    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(categoryNotExistbyId),

    fieldsValidator
], deleteCategory)


module.exports = router