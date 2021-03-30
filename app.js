const express = require("express");
const cors = require("cors");
require("dotenv").config();

const catRoutes = require("./Routes/categoryRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const prodRoutes = require("./Routes/productRoutes");
const searchRoutes = require("./Routes/searchRoutes");
const contRoutes = require("./Routes/contactRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/", catRoutes);
app.use("/blog", blogRoutes);
app.use("/product", prodRoutes);
app.use("/search", searchRoutes);
app.use("/contact", contRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.listen(port, () => {
  console.log(`Server is up, listening on port ${port}`);
});
