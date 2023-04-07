const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator, validateJWT, isAdminRoleValidator } = require("../middleware");
const { categoryNotExistbyId, productNotExistById, productExistbyName } = require("../helpers/db-validators");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/products");


const router = Router();

//Get products - public
router.get('/', getProducts)

//Get product by id - public
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(productNotExistById),

    fieldsValidator
], getProduct)


//Create product - private - all
router.post('/', [validateJWT,
    check('name', 'the name is required').notEmpty(),
    check('name').custom(productExistbyName),
    check('category', 'Is not a valid id').isMongoId(),
    check('category').custom(categoryNotExistbyId),

    fieldsValidator,
], createProduct)

//update product - private - all
router.put('/:id',
    [validateJWT,
        check('id', 'Is not a valid id').isMongoId(),
        check('id').custom(productNotExistById),
        check('name').custom(productExistbyName),
        check('category').custom(categoryNotExistbyId),
        fieldsValidator
    ],
    updateProduct)

//delete category - private - admin

router.delete('/:id', [
    validateJWT,
    isAdminRoleValidator,

    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(productNotExistById),

    fieldsValidator
], deleteProduct)


module.exports = router