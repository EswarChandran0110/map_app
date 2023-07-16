// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/map_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for storing the captured images
const imageSchema = new mongoose.Schema({
  image: String,
});
const Image = mongoose.model('Image', imageSchema);

// Define a route for saving the captured image
app.post('/api/images', (req, res) => {
  const { image } = req.body;
  const newImage = new Image({ image });
  newImage.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving the image');
    } else {
      res.status(200).send('Image saved successfully');
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
