const db = require("../../config/db");
const AppError = require("../../common/utils/app-error");


exports.findUsersByFilters = async (filters) => {
    console.log('filters:', filters);
    const {role, limit = 10, offset = 0} = filters;

    let query = `SELECT id, email, role, created_at FROM users`;

    const values = [];
    const conditions = [];

    if (role) {
        values.push(role);
        conditions.push(`role = $${values.length}`);
    }

    if (conditions.length) {
        query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY created_at DESC`;

    values.push(limit);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await db.query(query, values);

    return result.rows;
};
exports.archivedUserById = async (userId) => {
    const query = `UPDATE users set status = 'archived', created_at = NOW() where user_id = $1`;
    const result = await db.query(query, [userId]);
    return result.rows[0];
}
