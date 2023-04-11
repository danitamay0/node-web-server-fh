const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      user: '/api/users',
      uploads: '/api/uploads',
    }

    // Connect DB
    this.connectDB()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {

    // CORS
    this.app.use(cors())

    // JSON config
    this.app.use(express.json())

    //Public Files
    this.app.use(express.static('public'))

    // fileuploads
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {

    this.app.use(this.path.auth, require('../routes/auth'))
    this.app.use(this.path.categories, require('../routes/categories'))
    this.app.use(this.path.products, require('../routes/products'))
    this.app.use(this.path.search, require('../routes/search'))
    this.app.use(this.path.user, require('../routes/users'))
    this.app.use(this.path.uploads, require('../routes/uploads'))


  }

  listen() {
    this.app.listen(this.port, () => console.log("Server on port: " + this.port));
  }
}

module.exports = Server;
