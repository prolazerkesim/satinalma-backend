const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const orderController = require("../controllers/OrderController");

// Dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Sipariş CRUD
router.get("/", orderController.getAllOrders);
router.get("/:orderNo", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:orderNo", orderController.updateOrder);
router.delete("/:orderNo", orderController.deleteOrder);

// Dosya yükleme ve yönetimi
router.post("/:orderNo/dosya", upload.single("file"), orderController.uploadFile);
router.get("/:orderNo/dosya", orderController.getFile);
router.delete("/:orderNo/dosya", orderController.deleteFile);

module.exports = router;
