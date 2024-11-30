const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/fetch", (req, res) => {
	database.query("SELECT * FROM OrderBreakDown obd INNER JOIN Orders ord ON obd.OrderID = ord.OrderID INNER JOIN Users us  ON ord.UserID = us.UserID INNER JOIN Products ps ON ps.ProductID = obd.ProductID INNER JOIN ProductAttributes pas ON pas.P_AttributeID = obd.P_AttributeID INNER JOIN uservariants usv  ON usv.UserID = us.UserID  ORDER BY  ord.OrderDate DESC;", (err, results) => {
		if (err) {
			console.error("Error fetching orders:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		// console.log("Fetched orders:", results);
		// Function to process and transform the data
		const resultWithVariant = results.reduce((acc, item) => {
			// Find the existing order using the OrderID
			let order = acc.find((o) => o.OrderID === item.OrderID);

			if (!order) {
				// If the order doesn't exist, create a new order object
				order = {
					OrderID: item.OrderID,
					OrderStatusID: item.OrderStatusID,
					OrderDate: item.OrderDate, // Get the date part
					UserID: item.UserID,
					TotalAmount: Number(item.TotalOrder),
					Sales: Number(item.Sales),
					UserFName: item.UserFName,
					UserLName: item.UserLName,
					Contact: [], // Initialize Contact as an empty array
					Program: [], // Initialize Program as an empty array
					Order: {
						OrderID: item.OrderID,
						OrderBreakDown: [],
					},
				};
				acc.push(order); // Add the new order to the accumulator
			}

			// Add the variant value to the appropriate array (Contact/Program)
			if (item.UserVariantAttribute === "Contact") {
				order.Contact.push(item.UserVariantValue);
			} else if (item.UserVariantAttribute === "Program") {
				order.Program.push(item.UserVariantValue);
			}
			if (item.OrderID === order.OrderID) {
			
				const exists = order.Order.OrderBreakDown.some(
					(existingItem) =>
						existingItem.ProductID === item.ProductID &&
						existingItem.ProductSize === item.P_AttributeSize && // You can adjust this based on your definition of uniqueness
						existingItem.ProductVariant === item.P_AttributeValue // If needed, include more attributes
				);
				if (!exists) {
					order.Order.OrderBreakDown.push({
						ProductID: item.ProductID,
						ProductName: item.ProductName,
						ProductSize: item.P_AttributeSize,
						ProductPrice: item.P_AttributePrice,
						ProductAttributeID: item.P_AttributeID,
						ProductVariant: item.P_AttributeValue,
						OrderQuantity: item.OrderQuantity,
						OrderTotal: item.Total,
					});
				}
			}
			return acc;
		}, []);
		

		database.query(
			`SELECT COUNT(*)
FROM orders
WHERE OrderStatusID = 'ORDER_600' 
AND TIMESTAMPDIFF(HOUR, OrderDate, NOW()) > 24;`,
			(err, resultsPast24Hours) => {
				if (err) {
					console.error("Error fetching orders:", err.stack);
					res.status(500).send({
						error: "Internal Server Error" + err.stack,
					});
					return;
				}

				if (resultsPast24Hours[0]["COUNT(*)"] > 0) {
					database.query(
						`UPDATE orders
SET OrderStatusID = 'ORDER_400'
WHERE OrderStatusID = 'ORDER_600'
 AND TIMESTAMPDIFF(HOUR, OrderDate, NOW()) > 24;`,
						(err) => {
							if (err) {
								console.error("Error fetching orders:", err.stack);
								res.status(500).send({
									error: "Internal Server Error" + err.stack,
								});
								return;
							}
						}
					);
				}
			}
		);

		res.status(200).send({
			data: resultWithVariant,
		});
	});
});

router.post("/post_order", async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "No data received" });
	}
	console.log("post_order");

	const { name, studentId, date, time, orders, totalOrder, actor } = req.body;
	const orderID = `${studentId}_${date}_${time}`;

	const validOrder = [];

	try{
		        // Loop through each order and process asynchronously
				const checkOrders = orders.map(async (order) => {
					// Return a promise from the database query to wait for it
					const result = await new Promise((resolve, reject) => {
						database.query('SELECT Product_StockLeft FROM productstocks WHERE P_StockID=?', [order.P_StockID], (err, result) => {
							if (err) reject(err);
							resolve(result);
						});
					});
		
					// Check if the stock is available and push the valid orders to the validOrder array
					if (result[0].Product_StockLeft >= order.quantity) {
						validOrder.push(Number(result[0].Product_StockLeft));
					}
				});
		
				// Wait for all orders to be processed
				await Promise.all(checkOrders);

				if(validOrder.length !== orders.length ){
					throw new Error("Your Order is not processed, Please try again with different product quantity");
				}
				validOrder.forEach((value,index)=>{
						if(value < orders[index].quantity)
							throw new Error("Your Order is not processed, Please try again with different product quantity");
				})
				
					// Order Quantity Validated
					const insertOrder = "INSERT INTO Orders (OrderID,OrderStatusID,OrderDate,UserID,TotalOrder,Sales) VALUES (?,?,?,?,?,?)";
					database.query(insertOrder, [orderID, "ORDER_600", `${date} ${time}`, studentId, totalOrder, 0], (err) => {
						if (err) {
							console.log(err);
							return res.status(500).json({
								message: "Internal Server Error",
								data: null,
							});
						}
						const insertOrderBreakdown = "INSERT INTO OrderBreakdown(OrderID,UserID,ProductID,P_AttributeID,OrderQuantity,Total) VALUES (?,?,?,?,?,?)";
						const updateProductStock ='UPDATE productstocks SET  Product_StockLeft = Product_StockLeft - ?, Product_StockCondition=? WHERE P_StockID=?';


						orders.forEach((order,index) => {
							let stockCondition = "high";

							if ((validOrder[index]- order.quantity ) === 0) stockCondition = "out of stock";
							else if (( validOrder[index]-order.quantity ) <= 10) stockCondition = "low"; 
							else if ((validOrder[index]- order.quantity ) <= 20) stockCondition = "medium";

							console.log(stockCondition);
							console.log(order.quantity);
							console.log(validOrder[index]- order.quantity );

							database.query(updateProductStock,[order.quantity,stockCondition.toUpperCase(),order.P_StockID],(err)=>{
								if(err){
									console.log(err);
									return res.status(500).json({
										message: "Internal Server Error",
										data: null,
									});
								}
							});
							database.query(insertOrderBreakdown, [orderID, studentId, order.ProductID, order.P_AttributeID, order.quantity, order.quantity * order.P_AttributePrice], (err) => {
								if (err) {
									console.log(err);
									return res.status(500).json({
										message: "Internal Server Error",
										data: null,
									});
								}
							});
						});
						const insertActivityHistory = "INSERT INTO ActivityHistory (ActivityTitle,ActivityContent,ActivityDateTime,ActivityActor,ActivityType) VALUES (?,?,?,?,?)";
						database.query(insertActivityHistory, [`Order Placed`, `${name} has placed an order for a total of ${totalOrder} items on ${date} ${time}`, `${date} ${time}`, actor, "ORDER"], (err) => {
							if (err) {
								console.log(err);
								return res.status(500).json({
									message: "Internal Server Error",
									data: null,
								});
							}
						});
					
						return res.status(200).json({
							message: "Order Placed",
							data: "Data",
						});
					});
				
			
	}	catch(err){
		return res.status(500).json({
			error: err.message,
		});
	}

	
});
router.put("/update/status/:orderID", (req, res) => {
	const { orderID } = req.params;
	// console.log(orderID);
	console.log(req.body);

	const { newOrderStatus, paymentAmount, userID, postTime, paymentID, paymentDate, actor } = req.body;

	database.query("UPDATE orders SET OrderStatusID = ?, Sales = ? WHERE OrderID = ?;", [newOrderStatus, paymentAmount, orderID], (err) => {
		if (err) {
			console.error("Error updating order status:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});

			return;
		}
		database.query("INSERT INTO Sales (OrderID,PaymentID,PaymentDate,PaymentAmount,UserID,ActivityActor) VALUES (?,?,?,?,?,?);", [orderID, paymentID, paymentDate, paymentAmount, `${userID}`, `${actor}`], (err, results) => {
			if (err) {
				console.error("Error updating order status:", err.stack);
				res.status(500).send({
					error: "Internal Server Error" + err.stack,
				});
				return;
			}
			database.query("INSERT INTO ActivityHistory (ActivityTitle,ActivityContent,ActivityDateTime,ActivityActor,ActivityType) VALUES(?,?,?,?,?);", ["Post new Sales", `Order ${orderID} has been marked as ${newOrderStatus}`, `${paymentDate} ${postTime}`, actor, "SALES"], (err, results) => {
				if (err) {
					console.error("Error updating order status:", err.stack);
					res.status(500).send({
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
				res.status(200).send({
					data: orderID,
				});
			});
		});
	});
});

router.get("/fetch/:orderId", (req, res) => {
	const orderId = req.params.orderId;
	database.query("SELECT * FROM OrderBreakDown obd INNER JOIN Orders ord ON obd.OrderID = ord.OrderID INNER JOIN Users us  ON ord.UserID = us.UserID INNER JOIN Products ps ON ps.ProductID = obd.ProductID INNER JOIN ProductAttributes pas ON pas.P_AttributeID = obd.P_AttributeID INNER JOIN uservariants usv  ON usv.UserID = us.UserID  WHERE obd.OrderID=?;", [orderId], (err, results) => {
		if (err) {
			console.error("Error fetching orders:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
	
		const resultWithVariant = results.reduce((acc, item) => {
			// Find the existing order using the OrderID
			let order = acc.find((o) => o.OrderID === item.OrderID && o.P_AttributeID === item.P_AttributeID);

			if (!order) {
				// If the order doesn't exist, create a new order object
				order = {
					...item,
					Contact: [], // Initialize Contact as an empty array
					Program: [], // Initialize Program as an empty array
				};
				acc.push(order); // Add the new order to the accumulator
			}

			// Add the variant value to the appropriate array (Contact/Program)
			if (item.UserVariantAttribute === "Contact") {
				order.Contact.push(item.UserVariantValue);
			} else if (item.UserVariantAttribute === "Program") {
				order.Program.push(item.UserVariantValue);
			}

			return acc;
		}, []);
	
		// console.log("Result ", results);
		res.status(200).send({
			data: resultWithVariant,
		});
	});
});
module.exports = router;
