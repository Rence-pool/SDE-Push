const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/fetch", (req, res) => {
	const { from, to } = req.query;
	const fromDate = new Date(from);
	const toDate = new Date(to);
	// console.log(`${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDate()}`, toDate.getDate());
	// console.log(fromDate, );

	if (from == to) {
		console.log("inside if");
		database.query(
			` SELECT 
		  *,
		  SUM(sl.PaymentAmount) OVER () AS TotalSales
	  FROM Sales sl
	  INNER JOIN Users actor ON actor.UserID = sl.ActivityActor
	  INNER JOIN Orders ords ON sl.OrderID = ords.OrderID
	  INNER JOIN Users ur ON ords.UserID = ur.UserID
	  ORDER BY sl.PaymentDate DESC;`,
			(err, results) => {
				if (err) {
					console.error("Error fetching sales:", err.stack);
					res.status(500).send({
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
				console.log("results", results);
				res.status(200).send({
					data: results,
				});
			}
		);
	} else {
		console.log("outside if");
		database.query(
			` SELECT 
      *,
      SUM(sl.PaymentAmount) OVER () AS TotalSales
  FROM Sales sl
  INNER JOIN Users actor ON actor.UserID = sl.ActivityActor
  INNER JOIN Orders ords ON sl.OrderID = ords.OrderID
  INNER JOIN Users ur ON ords.UserID = ur.UserID
  WHERE sl.PaymentDate BETWEEN ? AND ?
  ORDER BY sl.PaymentDate DESC;`,
			[`${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`, `${toDate.getFullYear()}-${toDate.getMonth() + 1}-${toDate.getDate()}`],
			(err, results) => {
				if (err) {
					console.error("Error fetching sales:", err.stack);
					res.status(500).send({
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
				console.log("results", results);
				res.status(200).send({
					data: results,
				});
			}
		);
	}
});

module.exports = router;
