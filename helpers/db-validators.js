const { Category,Role, User } = require("../models");
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

const categoryExistbyName = async (name = "") => {
  //validate category
  const existCategory = await Category.findOne({ name: name.toUpperCase() });

  if (existCategory) {
    throw new Error(`The category ${name} already exist`);
  }
};

const categoryNotExistbyId = async (id = "") => {
  //validate category
  const existCategory = await Category.findById(id);

  if (!existCategory) {
    throw new Error(`The category not exist`);
  }
};




module.exports = { isRoleValid, isRoleValidOptional, emailExist, userExistbyId, categoryExistbyName, categoryNotExistbyId };
