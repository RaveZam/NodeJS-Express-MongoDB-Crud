const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Push from NodeJS Update");
});

//Get all
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Item
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    const UpdatedProduct = await Product.findById(id);
    res.status(200).json(UpdatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post Item
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Item
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product Deleted" });
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
