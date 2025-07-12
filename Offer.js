const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  price: Number,
  currency: String,
  date: Date
});

const ItemSchema = new mongoose.Schema({
  material: String,
  quantity: Number,
  requester: String,
  suppliers: [SupplierSchema]
});

const OfferSchema = new mongoose.Schema({
  offerNo: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  projectNo: String,
  requester: String,
  supplierNames: [String],
  items: [ItemSchema]
});

module.exports = mongoose.model('Offer', OfferSchema);
