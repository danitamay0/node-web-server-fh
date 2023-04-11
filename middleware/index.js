

const validateFields = require("./validate-fields");
const validateJWT = require("./validate-jwt");
const validateRole = require("./validate-role");
const  validateFieldUpload  = require("./validate-file-upload");

validateFieldUpload

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole,
    ...validateFieldUpload
}