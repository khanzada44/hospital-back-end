const db = require("../../config/db");
const AppError = require("../../common/utils/app-error");


exports.getAllUsers = async (req, res) => {
    try {
        const role = req.query.role; 
        const limit = req.query.limit;
        let query = `SELECT id, email, role, created_at FROM users`;

        if (role) {
            query += `WHERE role = $1`;
        } 
        if(limit){
            query += `LIMIT ${limit}`;
        }
        const result = await db.query(query, [role]);
        return result.rows;

    }
     catch (error) {
        throw new AppError("Error occurred while retrieving users", 500);
    }
};


