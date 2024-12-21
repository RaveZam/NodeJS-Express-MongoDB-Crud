const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");
const app = express();

//middleware configurations
app.use(express.json()); // This makes it JSON supportive
app.use(express.urlencoded({ extended: false })); // This makes it Form Supportive

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Push from NodeJS Update");
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
