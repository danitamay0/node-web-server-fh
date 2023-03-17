const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath= '/api/users'
    this.authPath= '/api/auth'

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

    this.app.use(this.usersPath,require('../routes/users'))
    this.app.use(this.authPath,require('../routes/auth'))
    
  }

  listen() {
    this.app.listen(this.port, () => console.log("Server on port: " + this.port));
  }
}

module.exports = Server;
