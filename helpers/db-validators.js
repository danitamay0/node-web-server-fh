const { Category, Role, User, Product } = require("../models");
/* const Role = require("../models/role");
const User = require("../models/user"); */

const isRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error(`The role ${role} is not register in the DB`);
  }
};
const isRoleValidOptional = async (role = "") => {
  if (role) {
    const existRole = await Role.findOne({ role });

    if (!existRole) {
      throw new Error(`The role ${role} is not register in the DB`);
    }
  }
};

const emailExist = async (email = "") => {
  //validate email
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} already exist`);
  }
};

const userExistbyId = async (id = "") => {
  //validate email
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`The id ${id} not exist`);
  }
};

/* CATEGEGORY */
const categoryExistbyName = async (name = "") => {
  //validate category
  const existCategory = await Category.findOne({ name: name.toUpperCase() });

  if (existCategory) {
    throw new Error(`The category ${name} already exist`);
  }
};

const categoryNotExistbyId = async (id = "") => {
  //validate category
  if (id) {
    const existCategory = await Category.findById(id);

    if (!existCategory) {
      throw new Error(`The category not exist`);
    }
  }

};


/* PRODUCT */
const productNotExistById = async (id = "") => {
  //validate category
  if (id) {
    const existProduct = await Product.findById(id);

    if (!existProduct) {
      throw new Error(`The product not exist`);
    }
  }

};

const productExistbyName = async (name = "") => {
  //validate category
  if (name) {

    const existProduct = await Product.findOne({ name: name.toUpperCase() });

    if (existProduct) {
      throw new Error(`The product ${name} already exist`);
    }
  }
};



module.exports = { isRoleValid, isRoleValidOptional, emailExist, userExistbyId, categoryExistbyName, categoryNotExistbyId, productNotExistById, productExistbyName };
