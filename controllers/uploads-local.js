const path = require('path');
const fs = require('fs');


const { response, request } = require("express");

const { uploadFileHelper } = require('../helpers');
const { User, Product } = require("../models");

const uploadFile = async (req = request, res = response) => {


    try {
        const path = await uploadFileHelper(req.files, undefined, 'imgs')
        res.json({ path: path });
    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const updateImage = async (req = request, res = response) => {

    const { collection, id } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({ msg: 'The user not exist' });
            }
            break;


        case 'products':
            model = await Product.findById(id)

            if (!model) {
                return res.status(400).json({ msg: 'The product not exist' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'model not implement' });
            break;
    }




    let nameImage
    try {
        nameImage = await uploadFileHelper(req.files, undefined, collection)
    } catch (msg) {
        res.status(400).json({ msg });
    }

    if (model.img) {

        const beforePath = path.join(__dirname, '../uploads', collection, model.img)

        if (fs.existsSync(beforePath)) {
            fs.unlinkSync(beforePath)
        }
    }

    model.img = nameImage
    await model.save()
    res.json(model);




}


const showImage = async (req, res = response) => {
    const { collection, id } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({ msg: 'The user not exist' });
            }
            break;


        case 'products':
            model = await Product.findById(id)

            if (!model) {
                return res.status(400).json({ msg: 'The product not exist' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'model not implement' });
            break;
    }


    if (model.img) {

        const imgPath = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(imgPath)) {
            return res.sendFile(imgPath)
        }
    }

    /*  */
    res.sendFile(path.join(__dirname, '../assets', 'no-image.jpg'))



}

module.exports = { uploadFile, updateImage, showImage }