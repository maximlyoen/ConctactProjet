const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fetchDataForAllPersonnes = require('./functions');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route for handling /api/entreprises
app.get('/api/entreprises', async (req, res) => {
  try {
    // Make a request to localhost:3001/entreprises
    const response = await axios.get('http://localhost:3001/entreprises');

    // Extract entreprises from the response data
    const entreprises = response.data;

    // Respond with the entreprises in JSON format
    res.json({ entreprises });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/entreprises/:id', async (req, res) => {
  try {
    // Make a request to localhost:3001/entreprises/:id
    const response = await axios.get(`http://localhost:3001/entreprises/${req.params.id}`);

    // Extract entreprises from the response data
    const entreprise = response.data;

    // Respond with the entreprises in JSON format
    res.json({ entreprise });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/personnes', async (req, res) => {
  try {
    fetchDataForAllPersonnes().then(results => {
      res.json({results});
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/personnes/:id', async (req, res) => {
  try {
    // Make a request to localhost:3001/personnes/:id
    const response = await axios.get(`http://localhost:3001/personnes/${req.params.id}`);

    // Extract personnes from the response data
    const personne = response.data;

    // Respond with the personnes in JSON format
    res.json({ personne });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route to serve React app or handle other routes
app.get('*', (req, res) => {
  // Your logic to handle other routes or serve React app
  res.send('Hello, this is the catch-all route!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
