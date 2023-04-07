const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require("../models");


const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles',
]

const searchUsers = async (term = "", res = response) => {

    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const user = await User.findById(term)

        return res.json({
            results: user ? [user] : []
        })
    }

    const regExp = new RegExp(term, 'i') //texpresion regular insensible a camelcase
    const users = await User.find({
        $or: [{ name: regExp }, { email: regExp }],
        $and: [{ state: true }]
    })

    return res.json({
        results: users
    })
}


const searchCategories = async (term = "", res = response) => {

    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const category = await Category.findById(term)

        return res.json({
            results: category ? [category] : []
        })
    }

    const regExp = new RegExp(term, 'i') //texpresion regular insensible a camelcase
    const users = await Category.find({
        name: regExp,
        state: true
    })

    return res.json({
        results: users
    })
}


const searchProducts = async (term = "", res = response) => {

    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const product = await Product.findById(term)
            .populate('category', 'name')
            .populate('user', 'name')

        return res.json({
            results: product ? [product] : []
        })
    }

    const regExp = new RegExp(term, 'i') //texpresion regular insensible a camelcase
    const products = await Product.find({
        name: regExp,
        state: true
    })
        .populate('category', 'name')
        .populate('user', 'name')

    return res.json({
        results: products
    })
}


const search = (req, res = response) => {
    const { collection, term } = req.params

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The collections allowed are ${allowedCollections}`
        })

    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
            break;
        case 'categories':
            searchCategories(term, res)

            break;
        case 'products':
            searchProducts(term, res)

            break;

        default:
            return res.status(500).json({
                msg: 'Not case validated'
            })
            break;
    }


}


module.exports = { search }