require('dotenv').config(); // ✅ Yeh sabse upar hona chahiye

const app = require('./app');
const mongoose = require('mongoose');

// ✅ MongoDB Atlas URI use karo bina localhost fallback ke
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.log('❌ MongoDB connection error:', err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});
