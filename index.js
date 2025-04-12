const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB error:', err));

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
