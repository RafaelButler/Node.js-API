const express = require("express");
const routes = express.Router();
const tokenVerified = require("../Token/generateToken");
const userController = require("./controllers/userController");

routes.post("/register", userController.store);
routes.post("/login", userController.login);
routes.get("/product", tokenVerified, userController.show);

module.exports = routes;
