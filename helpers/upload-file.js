
const path = require('path');
const { v4: uuidv4 } = require("uuid");



const uploadFileHelper = (files, extensionValid = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const splitName = file.name.split('.')
        const extension = splitName[splitName.length - 1]

        if (!extensionValid.includes(extension)) {
            return reject(`'the extension ${extension} file is not valid `)
        }

        const tempName = uuidv4() + '.' + extension

        uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                return reject(err)
            }

            resolve(tempName)
        });


    })


}

module.exports = { uploadFileHelper }