const express = require("express");
const router = express.Router();
const authMiddleware  = require("../../common/middleware/auth.middleware");
const adminController = require("./admin.controller");

 
router.get("/users", authMiddleware, adminController.getAllUsers);  
router.post("/add-new-role", authMiddleware, adminController.addNewUser);  
router.post("/users/:id", authMiddleware, adminController.archivedUser);  

module.exports = router;