const db = require("../../config/db");


exports.findUserByEmail = async (email) => {

    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const result = await db.query(query, [email]);
    return result.rows[0];
};

exports.createUser = async ({ id, email, password, role }) => {
    const query = `INSERT INTO users (user_uuid, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, role, created_at`;

    const result = await db.query(query, [id, email, password, role]);

    return result.rows[0];
};

exports.saveRefreshToken = async ({ user_uuid, token, expires_at }) => {
    const query = `INSERT INTO refresh_tokens (user_uuid, token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING user_uuid, token, expires_at`;

    const result = await db.query(query, [user_uuid, token, expires_at]);

    return result.rows[0];
};