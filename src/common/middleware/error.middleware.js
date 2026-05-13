const AppError = require("../utils/app-error");

const errorMiddleware = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    console.error("ERROR");
    console.error(err);

    if (err instanceof AppError) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    // PostgreSQL duplicate
    if (err.code === "23505") {
        return res.status(409).json({
            success: false,
            message: "Duplicate field value"
        });
    }


    if (err.code === "22P02") {
        return res.status(400).json({
            success: false,
            message: "Invalid input format"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

module.exports = errorMiddleware;