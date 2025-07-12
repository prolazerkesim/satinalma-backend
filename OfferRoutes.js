const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// Tüm teklifleri getir
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
});

// Tek bir teklif getir
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Teklif bulunamadı' });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
});

// Yeni teklif oluştur
router.post('/', async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.status(400).json({ message: 'Kayıt hatası', error });
  }
});

// Teklif güncelle
router.put('/:id', async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Güncelleme hatası', error });
  }
});

// Teklif sil
router.delete('/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Silindi' });
  } catch (error) {
    res.status(400).json({ message: 'Silme hatası', error });
  }
});

module.exports = router;
