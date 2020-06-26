const Pool = require("pg").Pool;
const pg = new Pool({
    user: process.env.User,
    host: process.env.Host,
    database: process.env.Database,
    password: process.env.Password,
    port: process.env.Port
});

module.exports = pg;
