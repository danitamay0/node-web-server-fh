const { response } = require("express");
const { Category } = require("../models");


const getCategories = async (req, res = response) => {

    const { from = 0, limit = 5 } = req.query
    const query = { state: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        categories
    });
}

const getCategory = async (req, res = response) => {

    const id = req.params.id
    const query = { state: true }

    const category = await
        Category.findById(id).populate('user', 'name')

    res.json({
        category
    });
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase()

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)
    await category.save()

    return res.status(201).json(category)

}

const updateCategory = async (req, res = response) => {

    const id = req.params.id
    const { state, user, ...data } = req.body

    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const category = await Category.findByIdAndUpdate(id, data)

    return res.status(201).json(category)

}


const deleteCategory = async (req, res = response) => {

    const id = req.params.id

    const data = {
        state: false,
        user: req.user._id
    }

    const category = await Category.findByIdAndUpdate(id, data, {new:true})

    return res.json(category)

}


module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory }