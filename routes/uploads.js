const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator, validateFieldUpload } = require("../middleware");
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require("../controllers/uploads");
const { collectiosPermited } = require("../helpers");


const router = Router();

router.post("/", [validateFieldUpload], uploadFile);

router.put("/:collection/:id", [
    validateFieldUpload,
    check('id', 'Is not a valid id').isMongoId(),
    check('collection').custom(c => collectiosPermited(c, ['users', 'products'])),
    fieldsValidator

], updateImageCloudinary);


router.get("/:collection/:id", [
    check('id', 'Is not a valid id').isMongoId(),
    check('collection').custom(c => collectiosPermited(c, ['users', 'products'])),
    fieldsValidator

], showImage);

module.exports = router