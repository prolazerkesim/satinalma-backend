const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://satinalmaprolazer.ct.ws',
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Gelen Origin:', origin);

    // Postman veya curl gibi 'origin'siz istekler
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      console.log('Origin izinli ✅');
      return callback(null, true);
    }

    console.log('❌ Bu origin izinli değil:', origin);
    return callback(new Error('CORS policy: Bu origin izinli değil.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));




app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser ve useUnifiedTopology artık mongoose 6+ da default
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch((err) => console.error('❌ MongoDB bağlantı hatası:', err));

// Routes
const orderRoutes = require('./routes/OrderRoutes');
const requestRoutes = require('./routes/RequestRoutes');
const offerRoutes = require('./routes/OfferRoutes');
const authRoutes = require('./routes/AuthRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// API endpointleri prefixli
app.use('/api/auth', authRoutes);
app.use('/api/siparisler', authMiddleware, orderRoutes);
app.use('/api/requests', authMiddleware, requestRoutes);
app.use('/api/offers', authMiddleware, offerRoutes);

// Sağlık testi
app.get('/api', (req, res) => {
  res.send('✅ Satınalma Backend API Çalışıyor!');
});

// React build servis et
app.use(express.static(path.join(__dirname, 'build')));

// React Router fallback
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Sunucu başlat
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

