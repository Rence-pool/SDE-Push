const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/fetch", (req, res) => {
	database.query("SELECT * FROM ActivityHistory ah INNER JOIN Users us ON ah.ActivityActor = us.UserID ORDER BY ah.ActivityDateTime DESC;", (err, results) => {
		if (err) {
			console.error("Error fetching activity history:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		res.status(200).send({
			data: results,
		});
	});
});
module.exports = router;
