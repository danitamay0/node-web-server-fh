const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = { isRoleValid, isRoleValidOptional, emailExist, userExistbyId };
