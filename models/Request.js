const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requestNo: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  projectNo: String,
  requester: String,
  items: [
    {
      material: String,
      quantity: Number,
      notes: String
    }
  ]
});

module.exports = mongoose.model('Request', RequestSchema);
