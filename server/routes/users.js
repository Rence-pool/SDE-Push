const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/fetch", (req, res) => {
	database.query(
		"SELECT * FROM Users;",
		(
			err,
			results
		) => {
			if (
				err
			) {
				console.error(
					"Error fetching users:",
					err.stack
				);
				res.status(500).send(
					{
						error:
							"Internal Server Error" +
							err.stack,
					}
				);
				return;
			}
			res.status(200).send(
				{
					data: results,
				}
			);
		}
	);
});
router.get("/fetch/user-roles", (req, res) => {
	const data =
		[];
	database.query(
		"SELECT * FROM UserRoles;",
		(err,resultsRoles) => { 
			if (err) {
				console.error("Error fetching users:",err.stack);
				res.status(500).send({error:"Internal Server Error" +err.stack,});
				return;
			}
			database.query(
				"SELECT * FROM StudentPrograms;",
				(err,resultsPrograms) => {
					if (err) {
						console.error(
							"Error fetching users:",
							err.stack
						);
						res.status(
							500
						).send(
							{
								error:
									"Internal Server Error" +
									err.stack,
							}
						);
						return;
					}
					data.push(
						resultsPrograms
					);
					data.push(
						resultsRoles
					);

					res.status(
						200
					).send(
						{
							data: data,
						}
					);
				}
			);
		}
	);
});
router.post("/post_user", (req, res) => {
	console.log(
		req.body
	);
	const {
		userId,
		fName,
		lName,
		email,
		password,
		userRole,
	} =
		req.body;
	database.query(
		`INSERT INTO Users (UserID, UserFName, UserLName, UserEmail, UserPassword, UserRole) VALUES (?, ?, ?, ?, ?, ?);`,
		[userId,fName,lName,email,password,userRole,],(err,results) => {
			if (err) {
				console.error("Error fetching users:",err.stack);
				res.status(500).send({error:"Internal Server Error" +	err.stack,});
				return;
			}
			if(userRole === "STDNT") {
				const {student} = req.body;
				student.forEach((student) => {
					database.query("INSERT INTO UserVariants (UserID, UserVariantAttribute,UserVariantValue) VALUES(?,?,?);", [userId,student.label,student.value], (err) => {
						if (err) {
							console.error("Error fetching users:", err.stack);
							res.status(500).send({ error: "Internal Server Error" + err.stack });
							return;
						}
						
					});
				});
				res.status(200).send({
					data: results,
				});
			}

		}
	);
});
module.exports = router;
