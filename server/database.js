require("dotenv").config();
const mysql = require("mysql2");
const database = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
});
database.connect((err) => {
	if (err) {
		console.error("Database connection failed:", err.stack);
		return;
	}
	console.log("Connected to database.");
});

module.exports = database;
