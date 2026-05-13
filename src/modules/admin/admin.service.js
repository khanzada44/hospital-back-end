const env = require("../../config/env");
const AppError = require("../../common/utils/app-error");
const adminRepository = require("./admin.repository");
const responseHelper = require('../../common/helpers/response.helper');


exports.findAllUsers = async (req, res, next) => {
    
    if (req.token.role !== "admin") {
        throw new AppError("Access denied. Only admins can access this resource.", 403);
    }
    else {
        try {
            const users = await adminRepository.findUsersByFilters(req.query);
            if (!users) {
                throw new AppError("No users found", 404);
            }
            return responseHelper.successResponse(res, "Users retrieved successfully", users);
        }
         catch (error) {
            next(error);
        }
    }

};
