const express = require("express");
const route = express.Router();
const handler = require("../controllers/seller");
const {imgFileHandle} =require("../middlewares/mediaHandler") 
const authorization = require("../middlewares/authorizaition");


route.use(authorization);
route.get("/", handler.getProducts);
route.post("/", imgFileHandle,  handler.addProduct);


module.exports = route;