const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const authRepository = require("./auth.repository");
const AppError = require("../../common/utils/app-error");
const generateId = require("../../common/utils/hash-password");
const { generateAccessToken, generateRefreshToken} = require("../../common/utils/generate-token");
const responseHelper = require('../../common/helpers/response.helper');


exports.register = async (data) => {
    const { email, password, role } = data;  

    if (!email || !password || !role) {
        throw new AppError(
            "Please provide all required fields.",
            400
        );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const existingUser = await authRepository.findUserByEmail(cleanEmail);

    if (existingUser) {
        throw new AppError(
            "An account already exists with this email address.",
            409
        );
    }
    const userId = generateId(6);
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const newUser = await authRepository.createUser({
        id: userId,
        email: cleanEmail,
        password: hashedPassword,
        role,
        
    });

    return responseHelper.successResponse(null, "Account created successfully.", newUser, 201);

};

exports.login = async (data) => {
  const { email, password } = data;

   if (!email || !password) {
       throw new AppError("Email and password required", 400);
   }
 
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();


    const user = await authRepository.findUserByEmail(cleanEmail);

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(cleanPassword, user.password_hash);

    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await authRepository.saveRefreshToken({
        user_uuid: user.user_uuid,
        token: refreshToken,
        expires_at: expiresAt
    });

    return responseHelper.successResponse(null, "Login successful", {
        user: {
            id: user.user_uuid,
            email: user.email,
            role: user.role

        },
        accessToken
    });
}