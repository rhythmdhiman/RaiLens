// Importing required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initializing express app
const app = express();
const port = process.env.PORT || 3000;  // Default port or Render port

// Middleware to parse JSON requests
app.use(express.json());  // To parse JSON in requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB connection string
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.log('MongoDB connection error:', err);
});

// MongoDB model (Define your schema)
const yourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const YourModel = mongoose.model('YourModel', yourSchema);

// Sample route to check if API is working
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Route to get data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const data = await YourModel.find();  // Fetch data from MongoDB
    res.json(data);  // Return the data as JSON
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Route to add data to MongoDB
app.post('/api/data', async (req, res) => {
  try {
    const newData = new YourModel(req.body);  // Create new data from request body
    await newData.save();  // Save to MongoDB
    res.status(201).json(newData);  // Return the created data
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
