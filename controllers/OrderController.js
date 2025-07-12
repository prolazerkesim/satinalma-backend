const fs = require("fs");
const path = require("path");
const Order = require("../models/Order");

// GET /siparisler
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

// GET /siparisler/:orderNo
exports.getOrder = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const order = await Order.findOne({ orderNo });
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

// POST /siparisler
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Oluşturma hatası", error });
  }
};

// PUT /siparisler/:orderNo
exports.updateOrder = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNo },
      req.body,
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Güncelleme hatası", error });
  }
};

// DELETE /siparisler/:orderNo
exports.deleteOrder = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const order = await Order.findOneAndDelete({ orderNo });
    if (!order)
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    res.json({ message: "Sipariş silindi" });
  } catch (error) {
    res.status(500).json({ message: "Silme hatası", error });
  }
};

// 📎 Dosya yükleme
exports.uploadFile = async (req, res) => {
  try {
    const { orderNo } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "Dosya yüklenmedi" });
    }

    const order = await Order.findOne({ orderNo });
    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    }

    order.file = {
      name: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
    };
    await order.save();

    res.json(order.file);
  } catch (error) {
    res.status(500).json({ message: "Dosya yükleme hatası", error });
  }
};

// 📎 Dosya bilgisi getir
exports.getFile = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const order = await Order.findOne({ orderNo });
    if (!order || !order.file) {
      return res.status(404).json({ message: "Dosya bulunamadı" });
    }
    res.json(order.file);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

// 📎 Dosya sil
exports.deleteFile = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const order = await Order.findOne({ orderNo });
    if (!order || !order.file) {
      return res.status(404).json({ message: "Dosya bulunamadı" });
    }

    // Sunucudan fiziksel dosyayı da silelim
    const filePath = path.join(__dirname, "..", order.file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    order.file = undefined;
    await order.save();

    res.json({ message: "Dosya silindi" });
  } catch (error) {
    res.status(500).json({ message: "Dosya silme hatası", error });
  }
};
