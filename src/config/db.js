const { Pool } = require("pg");
const env = require("./env");


const pool = new Pool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: String(env.db.password),
    database: env.db.name,
});

pool.connect().then(() =>{
    console.log("Connected to the database");
})
.catch((err) => {
    console.error("Error connecting to the database", err);
});

module.exports = pool;