const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

require("./connection/connection");
const user = require("./routes/user");
const books = require("./routes/book");
const favourate = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

// use middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favourate);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// creating port
app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
