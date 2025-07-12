const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Tüm talepleri getir
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
});

// Tek bir talep getir
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Talep bulunamadı' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
});

// Yeni talep oluştur
router.post('/', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.json(newRequest);
  } catch (error) {
    res.status(400).json({ message: 'Kayıt hatası', error });
  }
});

// Talep güncelle
router.put('/:id', async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Güncelleme hatası', error });
  }
});

// Talep sil
router.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: 'Silindi' });
  } catch (error) {
    res.status(400).json({ message: 'Silme hatası', error });
  }
});

module.exports = router;
