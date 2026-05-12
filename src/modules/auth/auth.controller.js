const authService = require("./auth.service");
const responseHelper = require('../../common/helpers/response.helper');

exports.register = async (req, res, next) => {
    
    try {
        const result = await authService.register(req.body);

        return responseHelper.successResponse(res, result.message, result.data, 201);

    }
    catch (err) {
        next(err);
    }
};
exports.login = async (req, res, next) => {
    
    try {
        const result = await authService.login(req.body);

        res.cookie("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return responseHelper.successResponse(res, result.message, {
            user: result.data.user,
            accessToken: result.data.accessToken
        }, 200);

    }
    catch (err) {
        responseHelper.errorResponse(res, err.message || "An error occurred while logging in", err.statusCode || 500);
    }
};