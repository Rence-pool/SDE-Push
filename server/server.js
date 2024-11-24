require("dotenv").config();
const productsRouter = require("./routes/products");
const orderStatusRouter = require("./routes/orders");
const activity = require("./routes/activity");
const users = require("./routes/users");
const sales = require("./routes/sales");
const overall = require("./routes/overall");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/orders", orderStatusRouter);
app.use("/api/activity", activity);
app.use("/api/sales", sales);
app.use("/api/users", users);
app.use("/api/overall", overall);

app.listen(process.env.PORT, () => {
	const port = process.env.PORT;
	console.log(`Server is running on port localhost:${port}`);
});
