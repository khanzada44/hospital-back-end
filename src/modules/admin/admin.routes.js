const express = require("express");
const router = express.Router();
const authMiddleware  = require("../../common/middleware/auth.middleware");
const adminController = require("./admin.controller");

 
router.get("/users", authMiddleware, adminController.getAllUsers);  

module.exports = router;