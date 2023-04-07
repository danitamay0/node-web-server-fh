const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth:'/api/auth',
      categories: '/api/categories',
      user:'/api/users',
    }

    // Connect DB
    this.connectDB()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes();
  }

  async connectDB(){
    await dbConnection()
  }

  middlewares(){

    // CORS
    this.app.use(cors())

    // JSON config
    this.app.use(express.json())

    //Public Files
    this.app.use(express.static('public'))
  }

  routes() {

    this.app.use(this.path.auth,require('../routes/auth'))
    this.app.use(this.path.categories,require('../routes/categories'))
    this.app.use(this.path.user,require('../routes/users'))

    
  }

  listen() {
    this.app.listen(this.port, () => console.log("Server on port: " + this.port));
  }
}

module.exports = Server;
