const { response, request } = require("express");
const bycryp = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {

  const { from = 0, limit = 5 } = req.query;
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //Crypt password

  const salt = bycryp.genSaltSync();
  user.password = bycryp.hashSync(password, salt);

  //Save user
  await user.save();
  res.status(201).json(user);
};

const usersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...data } = req.body;

  //VALIDATE IN DB

  if (password) {
    //Crypt password
    const salt = bycryp.genSaltSync();
    data.password = bycryp.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);
  res.status(201).json({
    msg: "put API",
    user,
  });
};

const usersDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
