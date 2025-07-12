const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  material: String,
  quantity: Number,
  price: Number,
  currency: String,
  supplierName: String,
  deliveryDate: Date,
});

const OrderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true },
    status: { type: String, default: "Beklemede" },
    date: { type: Date, default: Date.now },
    items: [ItemSchema],
    file: {
      name: String,
      path: String,
      mimeType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
