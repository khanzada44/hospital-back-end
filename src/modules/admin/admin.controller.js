const adminService = require('./admin.service');
const authService = require('../auth/auth.service')
const responseHelper = require('../../common/helpers/response.helper');



exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.findAllUsers(req, res);
        responseHelper.successResponse(res, "Users retrieved successfully", users);
    }
    catch (error) {
        responseHelper.errorResponse(res, error.message || "An error occurred while retrieving users", error.statusCode || 500);
    }
};

exports.addNewUser = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);
        responseHelper.successResponse(res, "User created successfully", newUser, 201);
    }
    catch (error) {
        responseHelper.errorResponse(res, error.message || "An error occurred while creating the user", error.statusCode || 500);
    }
};
exports.archivedUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await adminService.archivedUser(userId);
        responseHelper.successResponse(res, "User archived successfully");
    }
    catch (error) {
        responseHelper.errorResponse(res, error.message || "An error occurred while archiving the user", error.statusCode || 500);
    }
}

