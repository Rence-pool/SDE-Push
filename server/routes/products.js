const express = require("express");
const database = require("../database");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images/products/");
	},
	filename: (req, file, cb) => {
		const date = new Date();
		const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${file.originalname}`;
		cb(null, `${fileName}`);
	},
});

const upload = multer({ storage: storage });

router.get("/fetch", (req, res) => {
	database.query(`SELECT * FROM Products INNER JOIN ProductAttributes ON Products.ProductID = ProductAttributes.ProductID INNER JOIN ProductStocks ps ON ProductAttributes.P_StockID= ps.P_StockID INNER JOIN  StudentPrograms prs ON prs.ProgramID = Products.ProductProgram ;`, (err, results) => {
		if (err) {
			console.error("Error fetching products:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		// console.log("Fetched products:", results);
		const resultWithVariant = results.reduce((acc, item) => {
			// Check if product exists in accumulator
			let product = acc.find((p) => p.ProductID === item.ProductID);

			if (!product) {
				// If the product doesn't exist, create a new one
				product = {
					ProductID: item.ProductID,
					ProductName: item.ProductName,
					ProductDescription: item.ProductDescription,
					ProductProgram: item.ProgramID,
					ProductType: item.ProductTypeID,
					ProductStockID: item.ProductStockID,
					ProductVariants: [],
				};
				acc.push(product);
			}

			// Add the variant to the product's variants array
			product.ProductVariants.push({
				ProductSizeID: item.ProductSizeID,
				ProductVariantID: item.ProductVariantID,
				ProductPrice: item.ProductPrice,
				ProductStockLeft: item.ProductStockLeft,
				ProductVariantName: item.ProductVariantName,
				ProductSizeName: item.ProductSizeName,
			});

			return acc;
		}, []);

		res.status(200).send({ data: results });
	});
});
router.get("/fetch/display", (req, res) => {
	database.query("SELECT * FROM Products INNER JOIN  StudentPrograms prs ON prs.ProgramID = Products.ProductProgram ;", (err, results) => {
		if (err) {
			console.error("Error fetching products:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}

		res.status(200).send({ data: results });
	});
});

router.get("/fetch/product-info", (req, res) => {
	const queryProducts = new Promise((resolve, reject) => {
		database.query("SELECT * FROM ProductTypes;", (err, results) => {
			if (err) {
				reject("Error fetching products: " + err.stack);
			} else {
				resolve(results);
			}
		});
	});
	const queryStudentPrograms = new Promise((resolve, reject) => {
		database.query("SELECT * FROM studentprograms;", (err, results) => {
			if (err) {
				reject("Error fetching products: " + err.stack);
			} else {
				resolve(results);
			}
		});
	});
	const queryProductVariants = new Promise((resolve, reject) => {
		database.query("SELECT DISTINCT P_AttributeValue FROM productattributes;", (err, results) => {
			if (err) {
				reject("Error fetching products: " + err.stack);
			} else {
				resolve(results);
			}
		});
	});

	Promise.all([queryProducts, queryStudentPrograms,queryProductVariants])
		.then((results) => {
			console.log(results);
			res.status(200).send({
				data: results,
			});
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send({
				error: "Internal Server Error: " + error,
			});
		});
});



router.post("/post/new_product", upload.single("productImage"), async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "No data received" });
	}
	// console.log("Posting Product", req.body);

	const { productID, productType, productName, productDescription, productDefaultPrice, productProgram, stringProductAttributes } = req.body;

	const productAttributes = JSON.parse(stringProductAttributes);

	// console.log("Posting Product", productAttributes);

	const productImage = req.file.filename;
	// console.log("fileName", fileName);

	// productAttributes.forEach((attribute) => {
	// 	console.log("attribute", attribute);
	// });

	const insertProduct = "INSERT INTO Products (ProductID, ProductName,ProductTypeID, ProductDescription, ProductDefaultPrice, ProductProgram) VALUES(?,?,?,?,?,?)";

	const insertProductAttributes = "INSERT INTO ProductAttributes (ProductID, P_AttributeName, P_AttributeValue, P_AttributeSize, P_AttributePrice, P_StockID) VALUES  (?,?,?,?,?,?);";

	const insertProductImage = "INSERT INTO productimages (ProductID, ProductImage) VALUES  (?,?);";

	const insertProductStocks = "INSERT INTO ProductStocks VALUES(?,?,?);";
	database.query(insertProduct, [productID, productName, productType, productDescription, productDefaultPrice, productProgram], (err, results) => {
		if (err) {
			console.error("Error posting product:", err.stack);
			res.status(500).send({
				message: "Product Posting Failed",
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		productAttributes.forEach((attribute) => {
			database.query(insertProductAttributes, [productID, attribute.productAttributeName, attribute.productAttributeValue, attribute.productAttributeSize, attribute.productAttributePrice, attribute.productStockID], (err, results) => {
				if (err) {
					console.error("Error posting product stocks:", err.stack);
					res.status(500).send({
						message: "Product Stocks Posting Failed",
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
			});
		});
		productAttributes.forEach((attribute) => {
			database.query(insertProductStocks, [attribute.productStockID, attribute.productStockQuantity, "HIGH"], (err, results) => {
				if (err) {
					console.error("Error posting product stocks:", err.stack);
					res.status(500).send({
						message: "Product Stocks Posting Failed",
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
			});
		});

		database.query(insertProductImage, [productID, productImage], (err, results) => {
			if (err) {
				console.error("Error posting product image:", err.stack);
				res.status(500).send({
					message: "Product Image Posting Failed",
					error: "Internal Server Error" + err.stack,
				});
				return;
			}
			res.status(200).send({
				message: "Product Posting successfull",
			});
		});
	});
});

router.get("/fetch/:productId", (req, res) => {
	const productId = req.params.productId;
	database.query(`SELECT * FROM Products pr INNER JOIN ProductAttributes pa ON pa.ProductID  = pr.ProductID  INNER JOIN ProductStocks ps ON ps.P_StockID = pa.P_StockID 
INNER JOIN productimages pi ON pi.ProductID = pr.ProductID  WHERE pr.ProductID =?;`, [productId], (err, results) => {
		if (err) {
			console.error("Error fetching products:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		const newResult = results.reduce((acc, item) => {
			// Check if product exists in accumulator
			let product = acc.find((p) => p.ProductID === item.ProductID);

			if (!product) {
				// If the product doesn't exist, create a new one
				product = {
					ProductID: item.ProductID,
					ProductName: item.ProductName,
					ProductType: item.ProductTypeID,
					ProductDescription: item.ProductDescription,
					
					ProductDefaultPrice: item.ProductDefaultPrice,
					ProductProgram: item.ProductProgram,
					ProductImage: item.ProductImage,
					ProductVariants: [],
				};
				acc.push(product);
			}

			// Add the variant to the product's variants array
			product.ProductVariants.push({
				ProductVariant: item.P_AttributeID,
				ProductVariantName: item.P_AttributeName,
				ProductVariantValue: item.P_AttributeValue,
				ProductSize: item.P_AttributeSize,
				ProductPrice: item.P_AttributePrice,
				ProductStockID: item.P_StockID,
				ProductStockLeft: item.Product_StockLeft,
				ProductStockCondition: item.Product_StockCondition,
			});

			return acc;
		}, []);

		res.status(200).send({ data: newResult });
	});
});
router.put("/update/stock/:productStockID", (req, res) => {
		
		const {
		
			stockQuantity,
			actorID,
			productID,
			productStockID,
			productAttributeID,
			productStockCondition,
			actionType,
			update_timeStamp,
			update_dateStamp
		  } = req.body;
		
		  database.query("UPDATE ProductStocks SET Product_StockLeft = ?, Product_StockCondition = ? WHERE P_StockID = ?;", 
			[Number(stockQuantity), productStockCondition, productStockID], (err, results) => {
			if (err) {
				console.error("Error updating product stock:", err.stack);
				res.status(500).send({
					error: "Internal Server Error" + err.stack,
				});
				return;
			}
			database.query("INSERT INTO ActivityHistory (ActivityTitle,ActivityContent,ActivityDateTime,ActivityActor,ActivityType) VALUES(?,?,?,?,?);", [actionType, `Product  ${productID} StockID: ${productStockID} has been marked as ${productStockCondition} New Quantity: ${stockQuantity}`, `${update_dateStamp} ${update_timeStamp}`, actorID, 'STOCK'], (err, results) => {
				if (err) {
					console.error("Error updating product stock:", err.stack);
					res.status(500).send({
						error: "Internal Server Error" + err.stack,
					});
					return;
				}
				res.status(200).send({
					data: stockQuantity,
				});
			});
	// res.status(200).send({ data: "successfully updated" });
});
});
router.get("/display-user", (req, res) => {
	const query = "SELECT * FROM Products pr INNER JOIN ProductImages prdi ON pr.ProductID = prdi.ProductID;";
	database.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching products:", err.stack);
			res.status(500).send({
				error: "Internal Server Error" + err.stack,
			});
			return;
		}
		res.status(200).send({ data: results });
	});
});

router.get('/display-user/product-details/:productId', (req, res) => {
	const { productId } = req.params;
	console.log(productId);
	database.query(`SELECT * FROM Products pr INNER JOIN ProductAttributes prs ON pr.ProductID = prs.ProductID 
INNER JOIN productstocks ps ON ps.P_StockID = prs.P_StockID
INNER JOIN productimages pi ON pr.ProductID = pi.ProductID WHERE pr.ProductID = ?;
`,[productId],(err, results) => {
	if (err) {
		console.error("Error fetching products:", err.stack);
		res.status(500).send({
			error: "Internal Server Error" + err.stack,
		});
		return;
	}
	res.status(200).send({ data: results });
}
);
});
module.exports = router;
