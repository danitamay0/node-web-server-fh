const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req = request, res = response) => {
  console.log(req.body);
  res.status(201).json({
    msg: "post API",
  });
};

const usersPut = (req = request, res = response) => {
  const id = req.params.id;

  res.status(201).json({
    msg: "put API",
    id,
  });
};

const usersDelete = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "delete API",
    id,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
