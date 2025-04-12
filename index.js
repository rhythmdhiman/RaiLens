// index.js
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/railens', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB error:', err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
