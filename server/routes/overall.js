const express = require("express");
const router = express.Router();
const database = require("../database");
router.get("/fetch/dashboard", (req, res) => {
	const { year } = req.query;
	
	console.log(`${year}`);

	const resultsArray = [];


	const queryTop2ProductsOfPerMonth = new Promise((resolve, reject) => {
		database.query(`CALL GetTopProductsByYear(2024);`,
			 [year], (err, results) => {
				if (err) {
					reject("Error fetching sales: " + err.stack);
				} else {
					resolve(results);
				}
			});
	});

	const queryTotalSalesPerYear = new Promise((resolve, reject)=>{
		database.query(`SELECT months.month, IFNULL(SUM(s.PaymentAmount), 0) AS total_sales
			FROM (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
     		UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 
     		UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months
			LEFT JOIN sales s ON MONTH(s.PaymentDate) = months.month AND YEAR(s.PaymentDate) = ?
			GROUP BY months.month ORDER BY months.month;`,
			 [year], (err, results) => {
				if (err) {
					reject("Error fetching sales: " + err.stack);
				} else {
					resolve(results);
				}
			});
	});
	const queryTotalOrdersPerYear = new Promise((resolve, reject) => {
		database.query(`SELECT COUNT(*) as TotalOrders FROM Orders WHERE Year(OrderDate) = ?;`, [year], (err, results) => {
			if (err) {
				reject("Error fetching orders: " + err.stack);
			} else {
				resolve(results);
			}
		});
	});

	const querySales = new Promise((resolve, reject) => {
			database.query("SELECT SUM(sl.PaymentAmount) AS TotalSales FROM Sales sl WHERE Year(PaymentDate) =?;",[year], (err, results) => {
				if (err) {
					reject("Error fetching sales: " + err.stack);
				} else {
					resolve(results);
				}
			});
	});
	const queryStock = new Promise((resolve, reject) => {
		database.query("SELECT COUNT(Product_StockCondition) AS StockOutofStock FROM ProductStocks WHERE Product_StockCondition =?;", ["OUT OF STOCK"],
			 (err, results) => {
			if (err) {
				reject("Error fetching stock: " + err.stack);
			} else {
				resolve(results);
			}
		});
	});

	// Wait for both queries to resolve before sending the response
	Promise.all([querySales, queryStock,queryTotalOrdersPerYear,queryTotalSalesPerYear,queryTop2ProductsOfPerMonth])
		.then((results) => {
			resultsArray.push(...results[0]); // Sales query result
			resultsArray.push(...results[1]); // Stock query result
			resultsArray.push(...results[2]); // Total Orders query result
			resultsArray.push(results[3]); // Total Sales query result
			resultsArray.push(results[4]); // Top 2 Products query result
			res.status(200).send({
				data: resultsArray,
			});
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send({
				error: "Internal Server Error: " + error,
			});
		});
});

module.exports = router;
