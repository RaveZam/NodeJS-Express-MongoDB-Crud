const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Push from NodeJS Update");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@nodedb.qrn8o.mongodb.net/Node-CRUD-API?retryWrites=true&w=majority&appName=NodeDB"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening to 3000");
    });

    console.log("Connected To Database");
  })
  .catch(() => {
    console.log("Connection Error");
  });
