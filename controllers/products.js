const { response } = require("express");
const { Product } = require("../models");


const getProducts = async (req, res = response) => {

    const { from = 0, limit = 5 } = req.query
    const query = { state: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        products
    });
}

const getProduct = async (req, res = response) => {

    const id = req.params.id
    const query = { state: true }

    const product = await
        Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name')

    res.json({
        product
    });
}

const createProduct = async (req, res = response) => {
    const { name, user, price = 0, ...body } = req.body

    const data = {
        ...body,
        name: name.toUpperCase(),
        user: req.user._id,
        price: Number(price),

    }
console.log(data);
    const product = new Product(data)
    await product.save()

    return res.status(201).json(product)

}

const updateProduct = async (req, res = response) => {

    const id = req.params.id
    const { state, user, ...data } = req.body

    if (data.name) {
        data.name = data.name.toUpperCase()
    }
    data.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    return res.json(product)

}


const deleteProduct = async (req, res = response) => {

    const id = req.params.id

    const data = {
        state: false,
        user: req.user._id
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    return res.json(product)

}


module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct }