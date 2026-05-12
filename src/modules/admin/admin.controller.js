const adminService = require('./admin.service');
const responseHelper = require('../../common/helpers/response.helper');



const getAllUsers = async (req, res) => {
    try {
        const users = await adminService.findAllUsers(req, res);
        responseHelper.successResponse(res, "Users retrieved successfully", users);
    }
    catch (error) {
        responseHelper.errorResponse(res, error.message || "An error occurred while retrieving users", error.statusCode || 500);
    }
};
exports.getAllUsers = getAllUsers;