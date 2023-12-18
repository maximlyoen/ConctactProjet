const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route for handling /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    // Make a request to localhost:3001/posts
    const response = await axios.get('http://localhost:3001/posts');

    // Extract posts from the response data
    const posts = response.data;

    // Respond with the posts in JSON format
    res.json({ posts });
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
